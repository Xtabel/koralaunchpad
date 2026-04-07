import React from "react";
import { EmptyStates, SuccessBadgeIcon } from "@/assets/icons";
import { Stack } from "@mui/material";
import type { EmployeeIdeasDTO } from "@/types";
import Banner from "./sections/Banner";
import { EmptyCard, Toast } from "@/components/ui";
import Cards from "./sections/Cards";
import Modal from "./sections/Modal";

const hasSharedIdeaAnonymouslyStyle = {
  title: { fontSize: "20px", textAlign: "center" as const },
  subtitle: { color: "#6B7280" },
};

const IdeaSubmission = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"view" | "create">("create");
  const [selectedIdeaForView, setSelectedIdeaForView] = React.useState<
    EmployeeIdeasDTO | undefined
  >(undefined);
  const [hasSharedIdeaAnonymously, setHasSharedIdeaAnonymously] =
    React.useState(false);
  const [isSharingIdea, setIsSharingIdea] = React.useState(false);
  const [ideas, setIdeas] = React.useState<EmployeeIdeasDTO[]>([]);

  const hasIdeas = ideas.length > 0;

  const title = hasSharedIdeaAnonymously
    ? "Your idea has been shared successfully"
    : "Idea Launchpad";

  const subtitle = hasSharedIdeaAnonymously
    ? "Thanks for sharing your idea! It was submitted anonymously, and we didn't store any personal details. You can always share more ideas!"
    : "No idea has been shared yet";

  const icon = hasSharedIdeaAnonymously ? (
    <SuccessBadgeIcon sx={{ fontSize: "48px" }} />
  ) : (
    <EmptyStates.EmptyIdeaIcon sx={{ fontSize: "100px" }} />
  );

  const handleOpenModal = () => {
    setHasSharedIdeaAnonymously(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalMode("create");
    setSelectedIdeaForView(undefined);
  };

  const handleCardClick = (cardData: EmployeeIdeasDTO) => {
    setModalMode("view");
    setSelectedIdeaForView(cardData);
    setOpenModal(true);
  };

  const handleSubmitIdea = async (formData: FormData) => {
    try {
      setIsSharingIdea(true);

      const isAnonymous = formData.get("IsAnonymous") === "true";

      await new Promise((resolve) => setTimeout(resolve, 800));

      handleCloseModal();
      Toast.success("Idea shared successfully!");

      if (isAnonymous) {
        setHasSharedIdeaAnonymously(true);
      } else {
        // Match the FormData keys appended in Modal's handleSubmit
        const categoryId = Number(formData.get("CategoryId")) || 0;

        const MOCK_CATEGORIES: Record<number, string> = {
          1: "Technology",
          2: "Process Improvement",
          3: "Customer Experience",
          4: "Cost Reduction",
          5: "People & Culture",
        };

        const newIdea: EmployeeIdeasDTO = {
          id: Date.now(),
          ideaTitle: formData.get("IdeaTitle") as string,
          idea: formData.get("Idea") as string,
          isAnonymous: false,
          sharedDate: new Date().toISOString(),
          categoryId,
          ideaCategory: MOCK_CATEGORIES[categoryId] ?? "",
          employeeId: 1,
        };

        setIdeas((prev) => [newIdea, ...prev]);
      }
    } catch {
      Toast.error("An unexpected error occurred");
    } finally {
      setIsSharingIdea(false);
    }
  };

  return (
    <Stack spacing={4}>
      <Banner handleOpenModal={handleOpenModal} />

      {hasSharedIdeaAnonymously ? (
        <EmptyCard
          title={title}
          subtitle={subtitle}
          buttonText="Submit Idea"
          onClick={handleOpenModal}
          emptyIcon={icon}
          style={hasSharedIdeaAnonymouslyStyle}
        />
      ) : hasIdeas ? (
        <Cards
          data={ideas}
          loading={false}
          handleCardClick={handleCardClick}
          onOpenModal={handleOpenModal}
        />
      ) : (
        <EmptyCard
          title={title}
          subtitle={subtitle}
          buttonText="Submit Idea"
          onClick={handleOpenModal}
          emptyIcon={icon}
        />
      )}

      {/* key forces a remount whenever the selected idea changes,
          so Modal always initialises with the correct data — no useEffect needed */}
      <Modal
        key={selectedIdeaForView?.id ?? "create"}
        isOpen={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitIdea}
        isSubmitting={isSharingIdea}
        mode={modalMode}
        data={selectedIdeaForView}
      />
    </Stack>
  );
};

export default IdeaSubmission;