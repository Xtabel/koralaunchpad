import { CustomSelectField, CustomTextField, RichTextEditor } from "@/components/forms";
import { CustomModal } from "@/components/ui";
import { Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { VerticalAlternateIcon } from "@/assets/icons";
import type { EmployeeIdeasDTO } from "@/types";

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  data: File;
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting?: boolean;
  mode?: "view" | "create";
  data?: EmployeeIdeasDTO | undefined;
};

export interface FormDataState {
  isAnonymous: string;
  ideaTitle: string;
  categoryId: number;
  idea: string;
  employeeId?: number;
  attachments?: Attachment[];
}

const MOCK_EMPLOYEE_ID = 1;

const MOCK_IDEA_CATEGORIES = [
  { value: 1, label: "Technology" },
  { value: 2, label: "Process Improvement" },
  { value: 3, label: "Customer Experience" },
  { value: 4, label: "Cost Reduction" },
  { value: 5, label: "People & Culture" },
];

const EMPTY_FORM: FormDataState = {
  isAnonymous: "",
  ideaTitle: "",
  categoryId: 0,
  idea: "",
  employeeId: MOCK_EMPLOYEE_ID,
  attachments: [],
};

const getFormFromData = (data: EmployeeIdeasDTO): FormDataState => ({
  isAnonymous: data.isAnonymous ? "true" : "false",
  ideaTitle: data.ideaTitle || "",
  categoryId: data.categoryId || 0,
  idea: data.idea || "",
  employeeId: data.employeeId,
  attachments: [],
});

const Modal = (props: Props) => {
  const { mode = "create", data } = props;
  const isViewMode = mode === "view";

  // No useEffect needed — parent passes a unique `key` so this
  // component remounts fresh whenever data changes.
  const [formData, setFormData] = useState<FormDataState>(
    isViewMode && data ? getFormFromData(data) : EMPTY_FORM
  );
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  const submissionTypeOptions = [
    { value: "false", label: "With Name" },
    { value: "true", label: "Anonymous" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    name: string,
    value: string | number | (string | number)[]
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (value: string) => {
    setFormData((prev) => ({ ...prev, idea: value }));
  };

  const handleAttachmentsChange = (attachments: Attachment[]) => {
    setFormData((prev) => ({ ...prev, attachments }));
  };

  const isFormValid = () =>
    formData.isAnonymous.trim() !== "" &&
    formData.ideaTitle.trim() !== "" &&
    formData.categoryId !== 0 &&
    formData.idea.trim() !== "";

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formData.idea;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    if (plainText.trim() === "") {
      alert("Please provide a description for your idea");
      return;
    }

    try {
      const apiFormData = new FormData();
      apiFormData.append("IsAnonymous", formData.isAnonymous);
      apiFormData.append("IdeaTitle", formData.ideaTitle);
      apiFormData.append("CategoryId", formData.categoryId.toString());
      apiFormData.append("Idea", formData.idea);
      apiFormData.append(
        "EmployeeId",
        formData.isAnonymous === "false" && formData.employeeId
          ? formData.employeeId.toString()
          : ""
      );

      formData.attachments?.forEach((attachment) => {
        apiFormData.append("File", attachment.data);
      });

      await props.onSubmit(apiFormData);

      setFormData(EMPTY_FORM);
      setActiveFormats(new Set());
    } catch (error) {
      console.error("Error submitting idea:", error);
    }
  };

  const handleClose = () => {
    if (!isViewMode) setFormData(EMPTY_FORM);
    setActiveFormats(new Set());
    props.onClose();
  };

  const isMobile = window.innerWidth <= 768;

  const modalConfig = {
    title: isViewMode ? "View Idea" : "Idea Launchpad",
    subtitle: isViewMode
      ? "Here are the details of the idea shared"
      : "Kindly fill in the details below to share your wonderful ideas",
    primaryActionText: isViewMode ? "Close" : "Share ->",
    hideSecondaryAction: isViewMode,
  };

  return (
    <CustomModal
      isOpen={props.isOpen}
      onClose={handleClose}
      title={modalConfig.title}
      subtitle={modalConfig.subtitle}
      primaryActionText={modalConfig.primaryActionText}
      onPrimaryAction={isViewMode ? handleClose : handleSubmit}
      onSecondaryAction={handleClose}
      maxWidth={isMobile ? "md" : "sm"}
      primaryActionDisabled={!isFormValid() || props.isSubmitting}
      loading={props.isSubmitting}
      hideSecondaryAction={modalConfig.hideSecondaryAction}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <CustomSelectField
            required={!isViewMode}
            label="Submission type"
            name="isAnonymous"
            placeholder="--Select submission type--"
            options={submissionTypeOptions}
            value={formData.isAnonymous}
            onChange={(value) => handleSelectChange("isAnonymous", value)}
            multiple={false}
            disabled={isViewMode}
          />
        </Grid>

        <Grid size={12}>
          <CustomTextField
            required={!isViewMode}
            label="Idea title"
            name="ideaTitle"
            value={formData.ideaTitle}
            onChange={handleInputChange}
            placeholder="e.g. Adopt AI to improve workflow"
            disabled={isViewMode}
          />
        </Grid>

        <Grid size={12}>
          <CustomSelectField
            required={!isViewMode}
            label="Idea Category"
            name="categoryId"
            placeholder="--Select idea category--"
            options={MOCK_IDEA_CATEGORIES}
            value={formData.categoryId}
            onChange={(value) => handleSelectChange("categoryId", value)}
            multiple={false}
            disabled={isViewMode}
          />
        </Grid>

        <Grid size={12}>
          <RichTextEditor
            value={formData.idea}
            onChange={handleEditorChange}
            label="Description"
            required={!isViewMode}
            readonly={isViewMode}
            activeFormats={activeFormats}
            onActiveFormatsChange={setActiveFormats}
            attachments={formData.attachments || []}
            onAttachmentsChange={handleAttachmentsChange}
          />
        </Grid>

        {!isViewMode && formData.isAnonymous === "true" && (
          <Grid size={12}>
            <Stack
              direction="row"
              alignItems="center"
              bgcolor="#00171E"
              borderRadius="8px"
              padding="16px 8px"
              gap={0}
            >
              <VerticalAlternateIcon />
              <Typography fontSize={10} sx={{ color: "grey.400" }}>
                Your identity won't be recorded if you select "anonymous" as an
                option type.
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
    </CustomModal>
  );
};

export default Modal;