import React, { useState } from "react";
import { Stack } from "@mui/material";
import type { IdeaRow } from "@/_mock/reviewAndScore";
import StatsSection from "./sections/Cards";
import IdeaReviewTable from "./sections/Table";


const ReviewAndScore: React.FC = () => {
  const [selectedIdea, setSelectedIdea] = useState<IdeaRow | null>(null);
  console.log("Selected idea for scoring:", selectedIdea);

  const handleScoreClick = (row: IdeaRow) => {
    setSelectedIdea(row);
    // TODO: open score modal here once you send it
    console.log("Score clicked for:", row.ideaTitle);
  };

  return (
    <Stack spacing={3} sx={{ p: 0 }}>
      {/* Stat cards + period filter */}
      <StatsSection />

      {/* Tabbed idea review table */}
      <IdeaReviewTable onScoreClick={handleScoreClick} />

      {/* Score Modal goes here — wire selectedIdea once you send the component */}
      {/* <ScoreModal
            open={!!selectedIdea}
            idea={selectedIdea}
            onClose={() => setSelectedIdea(null)}
          /> */}
    </Stack>
  );
};

export default ReviewAndScore;