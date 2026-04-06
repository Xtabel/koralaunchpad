import type { TabConfig } from "@/types";

export function getTabsDataFromConfig<T extends string | number>(
  tabsConfig: Record<T, TabConfig>
): Array<{ label: string; badgeContent?: number }> {
  return Object.keys(tabsConfig).map((key) => {
    const config = tabsConfig[key as T];
    return {
      label: config.label,
      badgeContent: config.badgeContent,
    };
  });
}

export const validatePercentage = (value: string): string | null => {
  // Strip % if user typed it
  const cleaned = value.replace('%', '');

  // Allow only digits (add decimal support if needed)
  if (!/^\d*$/.test(cleaned)) return null;

  const num = Number(cleaned);

  // Reject values > 100
  if (num > 100) return null;

  return cleaned; // return valid number as string
};

export function hexToRgba(hex: string, alpha: number) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
export function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string?.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  const darkenFactor = 0.7; // Adjust this factor to make colors darker (0 < factor ≤ 1)
  for (let i = 0; i < 3; i += 1) {
    let value = (hash >> (i * 8)) & 0xff;
    value = Math.floor(value * darkenFactor); // Scale down the value to darken
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}