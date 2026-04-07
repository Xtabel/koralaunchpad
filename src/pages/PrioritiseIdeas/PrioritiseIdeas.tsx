import { Stack } from "@mui/material";

import type { PrioritiseRow } from "@/_mock/prioritiseIdeas";
import PrioritiseIdeasStats from "./sections/Cards";
import PrioritiseIdeasTable from "./sections/Table";

const PrioritiseIdeas = () => {
  const handleActionClick = (row: PrioritiseRow) => {
    console.log("Action clicked:", row.ideaTitle);
  };

  return (
    <Stack spacing={3}>
      <PrioritiseIdeasStats />
      <PrioritiseIdeasTable onApprove={handleActionClick} />
    </Stack>
  );
};

export default PrioritiseIdeas;