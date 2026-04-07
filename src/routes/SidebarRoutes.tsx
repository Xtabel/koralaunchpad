import { SidebarIcons } from "@/assets/icons/SidebarIcons";

export const SIDEBAR_CONFIG = {
  main: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <SidebarIcons.DashboardIcon />,
    },
    {
      title: "Submit an Idea",
      path: "/submit-idea",
      icon: <SidebarIcons.IdeaSubmissionIcon />,
    },
  ],
  management: [
    {
      title: "Review & Score",
      path: "/review-and-score",
      icon: <SidebarIcons.ReviewandScoreIcon />,
    },
    {
      title: "Prioritise Ideas",
      path: "/prioritise-ideas",
      icon: <SidebarIcons.PrioritizeIdeaIcon />,
    },
  ],
};
