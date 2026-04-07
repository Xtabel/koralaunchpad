// --- Types ---

export interface CardData {
  title: string;
  value: number;
  badge?: string;
  footerText: string;
  trend: "up" | "down";
  icon?: React.ReactNode;
  color: string;
  chartData: { value: number }[];
}
