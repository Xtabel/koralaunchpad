
export type ReviewStatus = "under_review" | "scored" | "awaiting_score" | "fully_scored";

export interface Reviewer {
  initials: string;
  color: string;
}

export interface IdeaRow {
  id: number;
  ideaTitle: string;
  submittedBy: string;
  category: string;
  submittedAt: string; // relative label
  status: ReviewStatus;
  reviewers: Reviewer[];
  reviewCount: number;
  reviewTotal: number;
  score: number | null;
  hasScored: boolean; // whether the current user has scored
}

export const MOCK_IDEAS: IdeaRow[] = [
  {
    id: 1,
    ideaTitle: "AI Customer Triage System",
    submittedBy: "Christabel Akpoguma",
    category: "Product",
    submittedAt: "3 days ago",
    status: "under_review",
    reviewers: [
      { initials: "AL", color: "#4CAF50" },
      { initials: "YE", color: "#2196F3" },
      { initials: "FE", color: "#FF5722" },
      { initials: "CA", color: "#9C27B0" },
    ],
    reviewCount: 5,
    reviewTotal: 6,
    score: null,
    hasScored: false,
  },
  {
    id: 2,
    ideaTitle: "Green Ops Dashboard",
    submittedBy: "Anonymous",
    category: "Operations",
    submittedAt: "5 days ago",
    status: "scored",
    reviewers: [
      { initials: "AL", color: "#4CAF50" },
      { initials: "YE", color: "#2196F3" },
      { initials: "FE", color: "#FF5722" },
    ],
    reviewCount: 3,
    reviewTotal: 6,
    score: 8.5,
    hasScored: true,
  },
  {
    id: 3,
    ideaTitle: "Financial Analyzer",
    submittedBy: "Kemi Akintunde",
    category: "Finance",
    submittedAt: "3 weeks ago",
    status: "under_review",
    reviewers: [
      { initials: "AL", color: "#4CAF50" },
      { initials: "YS", color: "#FF9800" },
    ],
    reviewCount: 2,
    reviewTotal: 6,
    score: null,
    hasScored: false,
  },
  {
    id: 4,
    ideaTitle: "Automated Payroll Reconciliation",
    submittedBy: "Tobi Adeyemi",
    category: "Finance",
    submittedAt: "1 week ago",
    status: "awaiting_score",
    reviewers: [
      { initials: "MK", color: "#E91E63" },
      { initials: "OS", color: "#00BCD4" },
    ],
    reviewCount: 2,
    reviewTotal: 6,
    score: null,
    hasScored: false,
  },
  {
    id: 5,
    ideaTitle: "Smart Leave Forecasting Tool",
    submittedBy: "Amara Osei",
    category: "People & Culture",
    submittedAt: "2 weeks ago",
    status: "fully_scored",
    reviewers: [
      { initials: "AL", color: "#4CAF50" },
      { initials: "YE", color: "#2196F3" },
      { initials: "FE", color: "#FF5722" },
      { initials: "CA", color: "#9C27B0" },
      { initials: "MK", color: "#E91E63" },
    ],
    reviewCount: 6,
    reviewTotal: 6,
    score: 7.2,
    hasScored: true,
  },
  {
    id: 6,
    ideaTitle: "Customer Onboarding Automation",
    submittedBy: "Anonymous",
    category: "Technology",
    submittedAt: "4 days ago",
    status: "awaiting_score",
    reviewers: [
      { initials: "OS", color: "#00BCD4" },
      { initials: "YS", color: "#FF9800" },
      { initials: "RE", color: "#607D8B" },
    ],
    reviewCount: 3,
    reviewTotal: 6,
    score: null,
    hasScored: false,
  },
];

const sparkData = [
  { value: 2 }, { value: 5 }, { value: 3 }, { value: 7 },
  { value: 4 }, { value: 6 }, { value: 8 }, { value: 5 },
];
const sparkDataDown = [
  { value: 8 }, { value: 6 }, { value: 5 }, { value: 7 },
  { value: 4 }, { value: 3 }, { value: 5 }, { value: 2 },
];

export const STAT_CARDS = [
  {
    id: "assigned",
    title: "Assigned",
    value: 12,
    badge: "+12",
    badgeColor: "#e3f2fd",
    badgeTextColor: "#1565C0",
    color: "#4CAF50",
    trend: "up" as const,
    footerText: "Total ideas assigned to me this month.",
    chartData: sparkData,
  },
  {
    id: "awaiting_score",
    title: "Awaiting Score",
    value: 4,
    badge: "+20",
    badgeColor: "#e3f2fd",
    badgeTextColor: "#1565C0",
    color: "#4CAF50",
    trend: "up" as const,
    footerText: "Ideas waiting to be reviewed by me this month",
    chartData: sparkData,
  },
  {
    id: "scored",
    title: "Scored",
    value: 8,
    badge: "+20",
    badgeColor: "#e3f2fd",
    badgeTextColor: "#1565C0",
    color: "#4CAF50",
    trend: "up" as const,
    footerText: "Ideas fully scored by me this month",
    chartData: sparkData,
  },
  {
    id: "fully_scored",
    title: "Fully Scored",
    value: 3,
    badge: "-20",
    badgeColor: "#fce4ec",
    badgeTextColor: "#c62828",
    color: "#e91e63",
    trend: "down" as const,
    footerText: "Ideas fully scored by reviewers this month",
    chartData: sparkDataDown,
  },
];

export const PERIOD_OPTIONS = [
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "this_quarter", label: "This Quarter" },
  { value: "this_year", label: "This Year" },
];

export const TAB_FILTERS: Record<number, ReviewStatus | "all"> = {
  0: "all",
  1: "awaiting_score",
  2: "under_review",
  3: "fully_scored",
};