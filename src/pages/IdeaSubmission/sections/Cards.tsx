import React, { useMemo, useState } from "react";
import { EmptyStates, AddIcon } from "@/assets/icons";
import {
  Background,
  CustomButton,
  EmptyCard,
  InfoCard,
  SetupOverview,
} from "@/components/ui";
import { Box, CircularProgress, Grid } from "@mui/material";

import type { EmployeeIdeasDTO } from "@/types";

type CardsProps = {
  loading: boolean;
  data: EmployeeIdeasDTO[] | undefined;
  handleCardClick: (cardData: EmployeeIdeasDTO) => void;
  onOpenModal: () => void;
};

const Cards: React.FC<CardsProps> = ({
  loading,
  data: employeeIdeas,
  handleCardClick,
  onOpenModal,
}) => {
  const [searchValue, setSearchValue] = useState("");

  // Utility function to strip HTML tags and get plain text
  const stripHtml = (html: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Transform API data to card format
  const allCards = useMemo(() => {
    return employeeIdeas?.map((idea) => {
      const plainTextDescription = stripHtml(idea.idea || "");

      return {
        id: idea.employeeId,
        title: idea.ideaTitle || "",
        category: idea.ideaCategory || "",
        description: plainTextDescription, // Use plain text for preview
        status: idea.isAnonymous,
        data: idea,
      };
    });
  }, [employeeIdeas]);

  // Filter cards based on search
  const filteredCards = useMemo(() => {
    if (!searchValue.trim() || !allCards) {
      return allCards;
    }

    const searchLower = searchValue.toLowerCase();
    return allCards.filter((card) => {
      return (
        card.title.toLowerCase().includes(searchLower) ||
        card.description.toLowerCase().includes(searchLower) ||
        (typeof card.category === "string" &&
          card.category.toLowerCase().includes(searchLower))
      );
    });
  }, [allCards, searchValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const renderCardContent = () => {
    // Loading state
    if (loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      );
    }

    // Empty state
    if (!filteredCards || filteredCards.length === 0) {
      const isSearchEmpty = !allCards || allCards.length === 0;

      return (
        <EmptyCard
          title={isSearchEmpty ? "No Ideas Available" : "No Results Found"}
          subtitle={
            isSearchEmpty
              ? "There are no ideas to display at the moment"
              : `No ideas match your search "${searchValue}"`
          }
          buttonText={isSearchEmpty ? "Share Ideas" : undefined}
          onClick={isSearchEmpty ? onOpenModal : undefined}
          emptyIcon={<EmptyStates.EmptyIdeaIcon sx={{ fontSize: "100px" }} />}
        />
      );
    }

    // Cards exist - render grid
    return (
      <Box pt={1}>
        <Grid container spacing={2}>
          {filteredCards.map((card) => (
            <Grid size={{xs:12, sm:6, md:4}} key={card.id}>
              <InfoCard
                // statusLabel={card.status ? "Anonymous" : "Public"}
                // statusColor={card.status ? "#8B5CF6" : "#4CAF50"}
                noAction
                hideTooltip
                onClick={() => handleCardClick(card.data)}
                title={card.title}
                icon={<EmptyStates.EmptyIdeaIcon />}
                subtext={
                  card.description.length > 40
                    ? `${card.description.substring(0, 40)}...`
                    : card.description
                }
                footer={`Category: ${card.category}`}
                actionText="View Idea"
                actionTextColor="#007CF5"
                styles={{
                  title: {
                    fontSize: "12px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                  },
                  card:{
                    height:"160px"
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Background sx={{ padding: "20px" }}>
      <SetupOverview
        title="Idea Bank"
        badgeCount={filteredCards?.length || 0}
        showSearch
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search ideas..."
        additionalContent={renderCardContent()}
        extraButtons={
          <CustomButton
            startIcon={<AddIcon />}
            variant="contained"
            onClick={onOpenModal}
            sx={{ p: 1.5 }}
          >
            Share Ideas
          </CustomButton>
        }
      />
    </Background>
  );
};

export default Cards;
