import { FirstWeatherIcon } from "@/assets";

export const SIDEBAR_CONFIG = {
  main: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: { default: FirstWeatherIcon, active: FirstWeatherIcon },
    },
    {
      title: "Submit an Idea",
      path: "/submit-idea",
      icon: { default: FirstWeatherIcon, active: FirstWeatherIcon },
    },
    {
      title: "Review & Score",
      path: "/review-and-score",
      icon: { default: FirstWeatherIcon, active: FirstWeatherIcon },
    },
    {
      title: "Prioritise Ideas",
      path: "/prioritise-ideas",
      icon: { default: FirstWeatherIcon, active: FirstWeatherIcon },
    },
  ],
  management: [],
};
