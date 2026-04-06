import { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import StatCard from "@/components/ui/Cards/GraphCards";
import { CustomSelectField } from "@/components/forms";
import {
  PRIORITISE_STAT_CARDS,
  PRIORITISE_PERIOD_OPTIONS,
} from "@/_mock/prioritiseIdeas";

const PrioritiseIdeasStats = () => {
  const [period, setPeriod] = useState<string | number>("this_month");

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Box sx={{ width: 160 }}>
          <CustomSelectField
            value={period}
            onChange={(val) => setPeriod(val as string)}
            options={PRIORITISE_PERIOD_OPTIONS}
            size="small"
            multiple={false}
          />
        </Box>
      </Stack>

      <Grid container spacing={2}>
        {PRIORITISE_STAT_CARDS.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <StatCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PrioritiseIdeasStats;