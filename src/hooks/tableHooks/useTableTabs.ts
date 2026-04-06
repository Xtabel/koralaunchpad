import { useState, useEffect, useCallback, useMemo } from "react";

interface TabStrategy<T> {
  getTabs: () => { label: string; badgeContent?: number }[];
  getDataForTab: (tabIndex: number) => T[];
  updateBadgeCounts: () => Promise<void>;
}

interface TabState<T> {
  active: number;
  data: T[];
}

export const useTableTabs = <T>(
  userType: string,
  createTabStrategy: (userType: string) => TabStrategy<T>
) => {
  const [tabState, setTabState] = useState<TabState<T>>({
    active: 0,
    data: [],
  });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // Memoize `tabStrategy` creation to avoid unnecessary recreation
  const tabStrategy = useMemo(() => createTabStrategy(userType), [userType, createTabStrategy]);

  // Update badge counts using memoized `tabStrategy`
  const updateBadgeCounts = useCallback(async () => {
    await tabStrategy.updateBadgeCounts();
  }, [tabStrategy]);

  // Load initial data and set up polling for badge counts
  useEffect(() => {
    const initialData = tabStrategy.getDataForTab(tabState.active);
    setTabState((prev) => ({ ...prev, data: initialData }));

    updateBadgeCounts();

    const pollInterval = setInterval(updateBadgeCounts, 30000);
    return () => clearInterval(pollInterval);
  }, [tabStrategy, tabState.active, updateBadgeCounts]);

  // Handle tab change
  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      const newData = tabStrategy.getDataForTab(newValue);
      setTabState({ active: newValue, data: newData });
    },
    [tabStrategy]
  );

  // Update data for the active tab
  const updateActiveTabData = useCallback(
    (activeIndex: number) => {
      const newData = tabStrategy.getDataForTab(activeIndex);
      setTabState({ active: activeIndex, data: newData });
    },
    [tabStrategy]
  );

  return {
    tabState,
    setTabState,
    anchorEl,
    setAnchorEl,
    handleTabChange,
    updateActiveTabData,
    tabStrategy,
  };
};
