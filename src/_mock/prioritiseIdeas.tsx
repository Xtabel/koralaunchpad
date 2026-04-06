import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import FlagIcon from "@mui/icons-material/Flag";

export type PrioritiseStatus = "pending" | "approved" | "in_pilot" | "completed" | "rejected";
export type RankLabel = "Excellent" | "High" | "Average" | "Below Average" | "Low";

export interface PrioritiseRow {
  id: number;
  rank: number;
  ideaTitle: string;
  submittedBy: string;
  category: string;
  score: number;
  rankLabel: RankLabel;
  reviewerCount: number;
  status: PrioritiseStatus;
  isApproved: boolean;
}

const sparkUp = [
  { value: 2 }, { value: 4 }, { value: 3 }, { value: 6 },
  { value: 5 }, { value: 7 }, { value: 8 }, { value: 6 },
];
const sparkDown = [
  { value: 8 }, { value: 6 }, { value: 7 }, { value: 4 },
  { value: 5 }, { value: 3 }, { value: 4 }, { value: 2 },
];

export const PRIORITISE_STAT_CARDS = [
  {
    id: "pending",
    title: "Pending",
    value: 8,
    badge: "+8",
    badgeColor: "#e3f2fd",
    badgeTextColor: "#1565C0",
    color: "#4CAF50",
    trend: "up" as const,
    footerText: "Ideas fully scored by me this month",
    chartData: sparkUp,
    icon: <AssignmentIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: "approved",
    title: "Approved",
    value: 4,
    badge: "+4",
    badgeColor: "#e3f2fd",
    badgeTextColor: "#1565C0",
    color: "#4CAF50",
    trend: "up" as const,
    footerText: "Ideas waiting to be reviewed by me this month",
    chartData: sparkUp,
    icon: <CheckCircleIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: "rejected",
    title: "Rejected",
    value: 3,
    badge: "-3",
    badgeColor: "#fce4ec",
    badgeTextColor: "#c62828",
    color: "#e91e63",
    trend: "down" as const,
    footerText: "Ideas fully scored by reviewers this month",
    chartData: sparkDown,
    icon: <CancelIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: "completed",
    title: "Completed",
    value: 4,
    badge: "+4",
    badgeColor: "#e3f2fd",
    badgeTextColor: "#1565C0",
    color: "#4CAF50",
    trend: "up" as const,
    footerText: "Ideas waiting to be reviewed by me this month",
    chartData: sparkUp,
    icon: <FlagIcon sx={{ fontSize: 20 }} />,
  },
];

export const PRIORITISE_PERIOD_OPTIONS = [
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "this_quarter", label: "This Quarter" },
  { value: "this_year", label: "This Year" },
];

export const PRIORITISE_TAB_FILTERS: Record<number, PrioritiseStatus | "all"> = {
  0: "pending",
  1: "approved",
  2: "in_pilot",
  3: "completed",
  4: "rejected",
};

export const MOCK_PRIORITISE_IDEAS: PrioritiseRow[] = [
  {
    id: 1,
    rank: 1,
    ideaTitle: "AI Customer Triage System",
    submittedBy: "Christabel Akpoguma",
    category: "Product",
    score: 8.6,
    rankLabel: "Excellent",
    reviewerCount: 6,
    status: "pending",
    isApproved: false,
  },
  {
    id: 2,
    rank: 2,
    ideaTitle: "Green Ops Dashboard",
    submittedBy: "James Nathan",
    category: "Operations",
    score: 7,
    rankLabel: "High",
    reviewerCount: 6,
    status: "approved",
    isApproved: true,
  },
  {
    id: 3,
    rank: 3,
    ideaTitle: "Financial Analyzer",
    submittedBy: "Kemi Akintunde",
    category: "Finance",
    score: 4,
    rankLabel: "Below Average",
    reviewerCount: 6,
    status: "pending",
    isApproved: false,
  },
  {
    id: 4,
    rank: 4,
    ideaTitle: "Smart Leave Forecasting Tool",
    submittedBy: "Amara Osei",
    category: "People & Culture",
    score: 9.1,
    rankLabel: "Excellent",
    reviewerCount: 6,
    status: "in_pilot",
    isApproved: false,
  },
  {
    id: 5,
    rank: 5,
    ideaTitle: "Customer Onboarding Automation",
    submittedBy: "Anonymous",
    category: "Technology",
    score: 6.5,
    rankLabel: "Average",
    reviewerCount: 6,
    status: "completed",
    isApproved: false,
  },
  {
    id: 6,
    rank: 6,
    ideaTitle: "Automated Payroll Reconciliation",
    submittedBy: "Tobi Adeyemi",
    category: "Finance",
    score: 3.2,
    rankLabel: "Low",
    reviewerCount: 6,
    status: "rejected",
    isApproved: false,
  },
];

export const PRIORITISE_CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "Technology", label: "Technology" },
  { value: "Operations", label: "Operations" },
  { value: "Finance", label: "Finance" },
  { value: "Product", label: "Product" },
  { value: "People & Culture", label: "People & Culture" },
];


export const CATEGORY_CHIP_COLOR = {
  color: "#52575C",
  backgroundColor: "#F5F5F5",
  borderColor: "#E0E0E0",
};

export const RANK_COLORS: Record<RankLabel, { color: string; backgroundColor: string; borderColor: string }> = {
  Excellent:       { color: "#2E7D32", backgroundColor: "#E8F5E9", borderColor: "#A5D6A7" },
  High:            { color: "#1565C0", backgroundColor: "#E3F2FD", borderColor: "#90CAF9" },
  Average:         { color: "#F57F17", backgroundColor: "#FFF8E1", borderColor: "#FFE082" },
  "Below Average": { color: "#E65100", backgroundColor: "#FFF3E0", borderColor: "#FFCC80" },
  Low:             { color: "#C62828", backgroundColor: "#FFEBEE", borderColor: "#EF9A9A" },
};