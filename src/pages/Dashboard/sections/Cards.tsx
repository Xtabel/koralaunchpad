import { dashboardData } from "@/_mock/dashboardCardData";
import StatCard from "@/components/ui/Cards/GraphCards";
import { Grid } from "@mui/material";

const Cards = () => {
  return (
    <>
      {dashboardData.map((item, index) => (
        <Grid size={{ xs: 12, md: 3 }} key={index}>
          <StatCard data={item} />
        </Grid>
      ))}
    </>
  );
};

export default Cards;
