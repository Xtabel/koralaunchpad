import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { type SxProps, useTheme } from "@mui/material";

import TabContainer from "@/components/ui/Tabs/TabContainer";

import TableTabs from "./TableTabs";
import type { TabConfig } from "@/types";
import { getTabsDataFromConfig } from "@/utils/Helperfunc";

interface TabbedViewProps<T extends string | number> {
  tabsConfig: Record<T, TabConfig>;
  defaultTab: T;
  tableTabsProps?: {
    forSetup?: boolean;
    small?: boolean;
    bgColor?: string;
    activeBgColor?: string;
    activeTextColor?: string;
    textColor?: string;
    scrollable?: boolean;
  };
  containerProps?: {
    loading?: boolean;
    sx?: SxProps;
  };
  onTabChange?: (tabKey: T) => void;
}

function TabbedView<T extends string | number>({
  tabsConfig,
  defaultTab,
  tableTabsProps = {},
  containerProps = {},
  onTabChange,
}: TabbedViewProps<T>) {
  const { tabKey } = useParams<{ tabKey: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // Track if the tab change originated from user interaction
  const isUserInteractionRef = useRef(false);

  // Initialize tab from URL or default
  const getInitialTab = (): T => {
    if (tabKey !== undefined) {
      const tabKeys = Object.keys(tabsConfig) as T[];
      const foundTab = tabKeys.find((key) => String(key) === tabKey);
      if (foundTab !== undefined) {
        return foundTab;
      }
    }
    return defaultTab;
  };

  const [activeTab, setActiveTab] = useState<T>(getInitialTab);

  // Sync tab with URL parameter when it changes (but not during user interaction)
  useEffect(() => {
    // Skip URL sync if this was triggered by user interaction
    if (isUserInteractionRef.current) {
      isUserInteractionRef.current = false;
      return;
    }

    if (tabKey !== undefined) {
      const tabKeys = Object.keys(tabsConfig) as T[];
      const foundTab = tabKeys.find((key) => String(key) === tabKey);
      if (foundTab !== undefined && foundTab !== activeTab) {
        setActiveTab(foundTab);
      }
    }
  }, [tabKey, tabsConfig, activeTab]);

  // Update URL when tab changes via user interaction
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const newTabKey = getTabKeyFromIndex(newValue);

    // Mark this as a user interaction to prevent useEffect from triggering
    isUserInteractionRef.current = true;

    setActiveTab(newTabKey);
    onTabChange?.(newTabKey);

    // Only update URL if we have a tab parameter in the route
    if (tabKey !== undefined) {
      // Get the base path without the tab parameter
      const pathParts = location.pathname.split("/");
      pathParts.pop(); // Remove the current tab key
      const basePath = pathParts.join("/");

      navigate(`${basePath}/${newTabKey}`, { replace: true });
    }
  };

  const tabKeys = Object.keys(tabsConfig) as T[];
  const getTabIndex = (tabKey: T): number => {
    return tabKeys.findIndex((key) => String(key) === String(tabKey));
  };
  const getTabKeyFromIndex = (index: number): T => tabKeys[index];

  const tabsData = getTabsDataFromConfig(tabsConfig);
  const ActiveComponent = tabsConfig[activeTab]?.component;

  const defaultTableTabsProps = {
    forSetup: true,
    textColor: theme.palette.primary.main,
    ...tableTabsProps,
  };

  return (
    <>
      <TableTabs
        value={getTabIndex(activeTab)}
        tabs={tabsData}
        onChange={handleTabChange}
        {...defaultTableTabsProps}
      />

      <TabContainer
        activeComponent={ActiveComponent}
        loading={containerProps.loading}
      />
    </>
  );
}

export default TabbedView;
