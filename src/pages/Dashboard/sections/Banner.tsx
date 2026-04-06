import { NotificationBanner } from "@/components/ui/Banner";

const Banner = () => {
  const bannerProps = {
    title: "Welcome Amarachi 👋",
    messageTemplate:
       "You have {count1} ideas pending your score and {count2} ideas ready for a prioritisation decision. Here's everything at a glance.",
    buttonText: "View now",
    onclick: () => {},
    count1: 4,
    count2: 5,
  };

  return <NotificationBanner {...bannerProps} />;
};

export default Banner;
