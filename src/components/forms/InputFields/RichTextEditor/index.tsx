import { useRef, useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  styled,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { RichTextToolbar } from "./RichTextToolbar";
import { Toast } from "@/components/ui";

const StyledRichTextEditor = styled("div")<{ readonly?: boolean }>(
  ({ theme, readonly }) => ({
    border: readonly
      ? `1px solid ${theme.palette.grey[400]}`
      : `1px solid ${theme.palette.divider}`,
    borderRadius: "8px",
    borderTopLeftRadius: readonly ? "8px" : 0,
    borderTopRightRadius: readonly ? "8px" : 0,
    padding: theme.spacing(1.5),
    minHeight: "144px",
    maxHeight: "300px",
    overflowY: "auto",
    backgroundColor: readonly
      ? theme.palette.grey[50]
      : theme.palette.background.paper,
    fontSize: "14px",
    fontFamily: theme.typography.fontFamily,
    lineHeight: 1.4375,
    color: readonly
      ? theme.palette.text.secondary
      : theme.palette.text.primary,
    outline: "none",
    cursor: readonly ? "not-allowed" : "text",
    opacity: readonly ? 0.7 : 1,
    transition: "border-color 0.2s",
    "&:focus": {
      borderColor: readonly ? theme.palette.divider : theme.palette.grey[100],
      borderWidth: readonly ? "1px" : "2px",
    },
    "& ul, & ol": { margin: "8px 0", paddingLeft: "20px" },
    "& li": { marginBottom: "4px" },
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
      cursor: "pointer",
      "&:hover": { textDecoration: "none" },
    },
    "&:empty:before": {
      content: '"Describe your idea and what problem it solves.  Don\'t worry about it being perfect — AI can help you tidy it up"',
      color: theme.palette.text.disabled,
      fontStyle: "italic",
      fontSize:"12px"
    },
  })
);

const AttachmentChip = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1),
  margin: theme.spacing(0.5, 0.5, 0.5, 0),
  backgroundColor: theme.palette.grey[100],
  borderRadius: "16px",
  fontSize: "12px",
  border: `1px solid ${theme.palette.grey[300]}`,
  "& .attachment-icon": { fontSize: "14px" },
  "& .remove-btn": {
    cursor: "pointer",
    marginLeft: theme.spacing(0.5),
    fontSize: "14px",
    color: theme.palette.text.secondary,
    "&:hover": { color: theme.palette.error.main },
  },
}));

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  data: File;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  readonly?: boolean;
  activeFormats: Set<string>;
  onActiveFormatsChange: (formats: Set<string>) => void;
  attachments?: Attachment[];
  onAttachmentsChange?: (attachments: Attachment[]) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label = "Description",
  required = false,
  readonly = false,
  activeFormats,
  onActiveFormatsChange,
  attachments = [],
  onAttachmentsChange,
}) => {
  const theme = useTheme();
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI improvement state
  const [isImprovingWithAI, setIsImprovingWithAI] = useState(false);
  const [improvedText, setImprovedText] = useState<string | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  useEffect(() => {
    if (editorRef.current && value && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>();
    if (document.queryCommandState("bold")) formats.add("bold");
    if (document.queryCommandState("italic")) formats.add("italic");
    if (document.queryCommandState("underline")) formats.add("underline");
    if (document.queryCommandState("insertUnorderedList"))
      formats.add("bulletList");
    if (document.queryCommandState("insertOrderedList"))
      formats.add("numberedList");
    if (document.queryCommandState("justifyLeft")) formats.add("alignLeft");
    if (document.queryCommandState("justifyCenter")) formats.add("alignCenter");
    if (document.queryCommandState("justifyRight")) formats.add("alignRight");
    if (document.queryCommandState("justifyFull")) formats.add("alignJustify");
    onActiveFormatsChange(formats);
  }, [onActiveFormatsChange]);

  const handleEditorInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    updateActiveFormats();
  }, [onChange, updateActiveFormats]);

  const handleEditorKeyUp = useCallback(() => {
    updateActiveFormats();
  }, [updateActiveFormats]);

  const handleFormatClick = (format: string) => {
    switch (format) {
      case "bold": document.execCommand("bold", false); break;
      case "italic": document.execCommand("italic", false); break;
      case "underline": document.execCommand("underline", false); break;
    }
    editorRef.current?.focus();
    updateActiveFormats();
  };

  const handleListSelect = (listType: "bullet" | "numbered") => {
    if (listType === "bullet") document.execCommand("insertUnorderedList", false);
    else document.execCommand("insertOrderedList", false);
    editorRef.current?.focus();
    updateActiveFormats();
  };

  const handleAlignSelect = (
    alignType: "left" | "center" | "right" | "justify"
  ) => {
    switch (alignType) {
      case "left": document.execCommand("justifyLeft", false); break;
      case "center": document.execCommand("justifyCenter", false); break;
      case "right": document.execCommand("justifyRight", false); break;
      case "justify": document.execCommand("justifyFull", false); break;
    }
    editorRef.current?.focus();
    updateActiveFormats();
  };

  const insertEmojiAtEnd = (emoji: string) => {
    if (editorRef.current) {
      const textNode = document.createTextNode(emoji);
      editorRef.current.appendChild(textNode);
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (editorRef.current.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          const textNode = document.createTextNode(emoji);
          range.insertNode(textNode);
          range.setStartAfter(textNode);
          range.setEndAfter(textNode);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          insertEmojiAtEnd(emoji);
        }
      } else {
        insertEmojiAtEnd(emoji);
      }
      handleEditorInput();
    }
  };

  const handleLinkInsert = (url: string, text: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const link = document.createElement("a");
        link.href = url;
        link.textContent = text;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        range.deleteContents();
        range.insertNode(link);
        range.setStartAfter(link);
        range.setEndAfter(link);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      handleEditorInput();
    }
  };

  // ── AI Improvement ──────────────────────────────────────────
  const handleImproveWithAI = async () => {
    const currentText = editorRef.current?.innerText?.trim();
    if (!currentText) {
      Toast.error("Please write something before using Improve with AI.");
      return;
    }

    setIsImprovingWithAI(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are a professional writing assistant. Rewrite the following idea description to be clearer, more concise, and more compelling. Preserve the original meaning and key points. Return only the improved text with no preamble or explanation.\n\n${currentText}`,
            },
          ],
        }),
      });

      const data = await response.json();
      const improved = data?.content
        ?.filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("");

      if (improved) {
        setImprovedText(improved);
        setReviewDialogOpen(true);
      } else {
        Toast.error("Could not improve the text. Please try again.");
      }
    } catch {
      Toast.error("Failed to connect to AI service. Please try again.");
    } finally {
      setIsImprovingWithAI(false);
    }
  };

  const handleAcceptImprovement = () => {
    if (improvedText && editorRef.current) {
      editorRef.current.innerText = improvedText;
      onChange(editorRef.current.innerHTML);
    }
    setReviewDialogOpen(false);
    setImprovedText(null);
  };

  const handleDiscardImprovement = () => {
    setReviewDialogOpen(false);
    setImprovedText(null);
  };
  // ────────────────────────────────────────────────────────────

  const handleAttachmentSelect = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const MAX_FILE_SIZE = 1048576;
    if (files && files.length > 0 && onAttachmentsChange) {
      const validFiles: File[] = [];
      const rejectedFiles: string[] = [];
      Array.from(files).forEach((file) => {
        if (file.size <= MAX_FILE_SIZE) validFiles.push(file);
        else rejectedFiles.push(`${file.name} (${formatFileSize(file.size)})`);
      });
      if (validFiles.length > 0) {
        const newAttachments: Attachment[] = validFiles.map((file) => ({
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          size: file.size,
          type: file.type,
          data: file,
        }));
        onAttachmentsChange([...attachments, ...newAttachments]);
      }
      if (rejectedFiles.length > 0) {
        Toast.error(
          `The following files exceed the 1MB size limit and were not added: ${rejectedFiles.join(", ")}`
        );
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveAttachment = (id: string) => {
    if (onAttachmentsChange) {
      onAttachmentsChange(attachments.filter((att) => att.id !== id));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Box>
      {label && (
        <Typography color="primary" fontSize="12px" fontWeight="500" mb={1}>
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </Typography>
      )}

      {!readonly && (
        <RichTextToolbar
          activeFormats={activeFormats}
          onFormatClick={handleFormatClick}
          onListSelect={handleListSelect}
          onAlignSelect={handleAlignSelect}
          onEmojiSelect={handleEmojiSelect}
          onLinkInsert={handleLinkInsert}
          onAttachmentSelect={handleAttachmentSelect}
          onImproveWithAI={handleImproveWithAI}
          isImprovingWithAI={isImprovingWithAI}
          disabled={readonly}
        />
      )}

      <StyledRichTextEditor
        ref={editorRef}
        contentEditable={!readonly}
        onInput={handleEditorInput}
        onKeyUp={handleEditorKeyUp}
        onClick={updateActiveFormats}
        suppressContentEditableWarning={true}
        readonly={readonly}
      />

      {/* Helper text below editor */}
      {!readonly && (
        <Typography
          fontSize="11px"
          color="text.secondary"
          fontStyle="italic"
          mt={0.75}
        >
          AI rewrites your description to be clearer — you review before it
          replaces anything.
        </Typography>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Attachments display */}
      {attachments.length > 0 && (
        <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
          {attachments.map((attachment) => (
            <AttachmentChip key={attachment.id}>
              <span className="attachment-icon">📎</span>
              <span>{attachment.name}</span>
              <span style={{ fontSize: "10px", color: theme.palette.text.secondary }}>
                ({formatFileSize(attachment.size)})
              </span>
              {!readonly && (
                <span
                  className="remove-btn"
                  onClick={() => handleRemoveAttachment(attachment.id)}
                >
                  ×
                </span>
              )}
            </AttachmentChip>
          ))}
        </Box>
      )}

      {/* AI Review Dialog */}
      <Dialog
        open={reviewDialogOpen}
        onClose={handleDiscardImprovement}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: "16px", fontWeight: 600 }}>
          Review AI Improvement
        </DialogTitle>
        <DialogContent dividers>
          <Typography fontSize="12px" color="text.secondary" mb={1}>
            Here's the improved version of your description. Accept to replace
            your text, or discard to keep the original.
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: "8px",
              bgcolor: "grey.50",
              border: "1px solid",
              borderColor: "divider",
              fontSize: "14px",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {improvedText}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            onClick={handleDiscardImprovement}
            variant="outlined"
            size="small"
            sx={{ textTransform: "none", fontSize: "12px" }}
          >
            Discard
          </Button>
          <Button
            onClick={handleAcceptImprovement}
            variant="contained"
            size="small"
            sx={{ textTransform: "none", fontSize: "12px" }}
          >
            Accept & Replace
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RichTextEditor;