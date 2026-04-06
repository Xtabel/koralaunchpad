import { Grid, Skeleton } from "@mui/material";
import Banner from "./sections/Banner";
// import Cards from "./sections/Cards";
// import IdeaPipelineChart from "./sections/Chart";
import { lazy, Suspense } from "react";

const Cards = lazy(() => import("./sections/Cards"));
const IdeaPipelineChart = lazy(() => import("./sections/Chart"));
const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Banner />
      <Suspense fallback={<Skeleton variant="rounded" height={120} sx={{ width: "100%" }} />}>
        <Cards />
      </Suspense>
      <Suspense fallback={<Skeleton variant="rounded" height={300} sx={{ width: "100%" }} />}>
        <IdeaPipelineChart />
      </Suspense>
    </Grid>
  );
};

export default Dashboard;
