import { STAT_CARDS } from "@/_mock/reviewAndScore";
import StatCard from "@/components/ui/Cards/GraphCards";
import { Grid } from "@mui/material";

const Cards = () => {
  return (
    <Grid container spacing={2}>
      {STAT_CARDS.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <StatCard data={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
