// --- Mock Data ---

import { InfoIcon } from "@/assets";
import type { CardData } from "@/types";

const MOCK_CHART_DATA_GREEN = [
  { value: 5 },
  { value: 12 },
  { value: 8 },
  { value: 15 },
  { value: 10 },
  { value: 14 },
  { value: 11 },
];

const MOCK_CHART_DATA_PINK = [
  { value: 8 },
  { value: 15 },
  { value: 5 },
  { value: 12 },
  { value: 7 },
  { value: 10 },
  { value: 6 },
];

export const dashboardData: CardData[] = [
  {
    title: "Total Ideas",
    value: 12,
    footerText: "12 this month",
    trend: "up",
    icon: <InfoIcon fontSize="small" color="primary" />,
    color: "#2e7d32", // Green
    chartData: MOCK_CHART_DATA_GREEN,
  },
  {
    title: "Pending Review",
    value: 4,
    footerText: "3 assigned today",
    trend: "up",
    icon: <InfoIcon fontSize="small" color="primary" />,
    color: "#2e7d32",
    chartData: MOCK_CHART_DATA_GREEN,
  },
  {
    title: "Approved to Build",
    value: 8,
    footerText: "5 this month",
    trend: "up",
    icon: <InfoIcon fontSize="small" color="primary" />,
    color: "#2e7d32",
    chartData: MOCK_CHART_DATA_GREEN,
  },
  {
    title: "In Pilot",
    value: 3,
    badge: "-20",
    footerText: "1 paused",
    trend: "down",
    icon: <InfoIcon fontSize="small" color="primary" />,
    color: "#d81b60", // Pink/Red
    chartData: MOCK_CHART_DATA_PINK,
  },
];
