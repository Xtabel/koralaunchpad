import { useState } from "react";
import {
  Box,
  IconButton,
  styled,
  Divider,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LinkIcon from "@mui/icons-material/Link";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import { CustomButton } from "@/components/ui";
import CustomTextField from "../CustomTextField";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: "6px",
  borderRadius: "6px",
  transition: "all 0.2s",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
    fontWeight: 400,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const COMMON_EMOJIS = [
  "😊", "😂", "❤️", "👍", "🎉", "💡", "✨", "🔥",
  "👏", "🙌", "💯", "⭐", "🚀", "💪", "🎯", "✅",
];

interface RichTextToolbarProps {
  activeFormats: Set<string>;
  onFormatClick: (format: string) => void;
  onListSelect: (listType: "bullet" | "numbered") => void;
  onAlignSelect: (alignType: "left" | "center" | "right" | "justify") => void;
  onEmojiSelect: (emoji: string) => void;
  onLinkInsert: (url: string, text: string) => void;
  onAttachmentSelect: () => void;
  onImproveWithAI: () => void;
  isImprovingWithAI?: boolean;
  disabled?: boolean;
}

export const RichTextToolbar: React.FC<RichTextToolbarProps> = ({
  activeFormats,
  onFormatClick,
  onListSelect,
  onAlignSelect,
  onEmojiSelect,
  onLinkInsert,
  onAttachmentSelect,
  onImproveWithAI,
  isImprovingWithAI = false,
  disabled = false,
}) => {
  const [listAnchorEl, setListAnchorEl] = useState<null | HTMLElement>(null);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<null | HTMLElement>(null);
  const [alignAnchorEl, setAlignAnchorEl] = useState<null | HTMLElement>(null);
  const [linkAnchorEl, setLinkAnchorEl] = useState<null | HTMLElement>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const isListActive =
    activeFormats.has("bulletList") || activeFormats.has("numberedList");
  const isAlignActive =
    activeFormats.has("alignCenter") ||
    activeFormats.has("alignRight") ||
    activeFormats.has("alignJustify");

  const getCurrentAlignIcon = () => {
    if (activeFormats.has("alignCenter"))
      return <FormatAlignCenterIcon sx={{ fontWeight: 300 }} />;
    if (activeFormats.has("alignRight"))
      return <FormatAlignRightIcon sx={{ fontWeight: 300 }} />;
    if (activeFormats.has("alignJustify"))
      return <FormatAlignJustifyIcon sx={{ fontWeight: 300 }} />;
    return <FormatAlignLeftIcon sx={{ fontWeight: 300 }} />;
  };

  const handleListClick = (event: React.MouseEvent<HTMLElement>) =>
    setListAnchorEl(event.currentTarget);
  const handleListClose = () => setListAnchorEl(null);
  const handleListSelectInternal = (listType: "bullet" | "numbered") => {
    onListSelect(listType);
    handleListClose();
  };

  const handleEmojiClick = (event: React.MouseEvent<HTMLElement>) =>
    setEmojiAnchorEl(event.currentTarget);
  const handleEmojiClose = () => setEmojiAnchorEl(null);
  const handleEmojiSelectInternal = (emoji: string) => {
    onEmojiSelect(emoji);
    handleEmojiClose();
  };

  const handleAlignClick = (event: React.MouseEvent<HTMLElement>) =>
    setAlignAnchorEl(event.currentTarget);
  const handleAlignClose = () => setAlignAnchorEl(null);
  const handleAlignSelectInternal = (
    alignType: "left" | "center" | "right" | "justify"
  ) => {
    onAlignSelect(alignType);
    handleAlignClose();
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) =>
    setLinkAnchorEl(event.currentTarget);
  const handleLinkClose = () => {
    setLinkAnchorEl(null);
    setLinkUrl("");
    setLinkText("");
  };
  const handleLinkInsert = () => {
    if (linkUrl && linkText) {
      onLinkInsert(linkUrl, linkText);
      handleLinkClose();
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          borderBottom: "none",
          borderRadius: "8px",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          bgcolor: disabled ? "grey.100" : "grey.50",
          px: 1.5,
          py: 0.75,
        }}
      >
        {/* Toolbar row: formatting tools on the left, AI button on the right */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Left: formatting icons */}
          <Box display="flex" alignItems="center" gap={0.25}>
            <StyledIconButton
              size="small"
              onClick={() => onFormatClick("bold")}
              disabled={disabled}
              sx={{
                backgroundColor: activeFormats.has("bold")
                  ? "action.selected"
                  : "transparent",
              }}
            >
              <FormatBoldIcon sx={{ fontWeight: 300 }} />
            </StyledIconButton>

            <StyledIconButton
              size="small"
              onClick={() => onFormatClick("italic")}
              disabled={disabled}
              sx={{
                backgroundColor: activeFormats.has("italic")
                  ? "action.selected"
                  : "transparent",
              }}
            >
              <FormatItalicIcon sx={{ fontWeight: 300 }} />
            </StyledIconButton>

            <StyledIconButton
              size="small"
              onClick={() => onFormatClick("underline")}
              disabled={disabled}
              sx={{
                backgroundColor: activeFormats.has("underline")
                  ? "action.selected"
                  : "transparent",
              }}
            >
              <FormatUnderlinedIcon sx={{ fontWeight: 300 }} />
            </StyledIconButton>

            <StyledIconButton
              size="small"
              onClick={handleEmojiClick}
              disabled={disabled}
            >
              <InsertEmoticonIcon sx={{ fontWeight: 300 }} />
            </StyledIconButton>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 0.5, height: 24, alignSelf: "center" }}
            />

            <StyledIconButton
              size="small"
              onClick={handleListClick}
              disabled={disabled}
              sx={{
                backgroundColor: isListActive
                  ? "action.selected"
                  : "transparent",
                display: "flex",
                gap: 0.25,
                pr: 0.5,
              }}
            >
              <FormatListBulletedIcon sx={{ fontWeight: 300 }} />
              <ArrowDropDownIcon sx={{ fontSize: 16 }} />
            </StyledIconButton>

            <StyledIconButton
              size="small"
              onClick={handleAlignClick}
              disabled={disabled}
              sx={{
                backgroundColor: isAlignActive
                  ? "action.selected"
                  : "transparent",
                display: "flex",
                gap: 0.25,
                pr: 0.5,
              }}
            >
              {getCurrentAlignIcon()}
              <ArrowDropDownIcon sx={{ fontSize: 16 }} />
            </StyledIconButton>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 0.5, height: 24, alignSelf: "center" }}
            />

            <StyledIconButton
              size="small"
              onClick={handleLinkClick}
              disabled={disabled}
            >
              <LinkIcon sx={{ fontWeight: 300 }} />
            </StyledIconButton>

            <StyledIconButton
              size="small"
              onClick={onAttachmentSelect}
              disabled={disabled}
            >
              <AttachFileIcon sx={{ fontWeight: 300 }} />
            </StyledIconButton>
          </Box>

          {/* Right: Improve with AI button */}
          <CustomButton
            size="small"
            variant="outlined"
            onClick={onImproveWithAI}
            disabled={disabled || isImprovingWithAI}
            startIcon={
              isImprovingWithAI ? (
                <CircularProgress size={14} color="inherit" />
              ) : (
                <AutoFixHighIcon sx={{ fontSize: "14px !important" }} />
              )
            }
            sx={{
              fontSize: "11px",
              px: 1.5,
              py: 0.5,
              textTransform: "none",
              borderColor: "primary.light",
              color: "primary.main",
              whiteSpace: "nowrap",
              "&:hover": { borderColor: "primary.main" },
            }}
          >
            {isImprovingWithAI ? "Improving..." : "Improve with AI"}
          </CustomButton>
        </Box>
      </Paper>

      {/* List Type Menu */}
      <Menu
        anchorEl={listAnchorEl}
        open={Boolean(listAnchorEl)}
        onClose={handleListClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { minWidth: 180, mt: 0.5 } }}
      >
        <MenuItem
          onClick={() => handleListSelectInternal("bullet")}
          selected={activeFormats.has("bulletList")}
        >
          <ListItemIcon>
            <FormatListBulletedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Bullet List</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleListSelectInternal("numbered")}
          selected={activeFormats.has("numberedList")}
        >
          <ListItemIcon>
            <FormatListNumberedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Numbered List</ListItemText>
        </MenuItem>
      </Menu>

      {/* Alignment Menu */}
      <Menu
        anchorEl={alignAnchorEl}
        open={Boolean(alignAnchorEl)}
        onClose={handleAlignClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { minWidth: 180, mt: 0.5 } }}
      >
        <MenuItem
          onClick={() => handleAlignSelectInternal("left")}
          selected={activeFormats.has("alignLeft")}
        >
          <ListItemIcon>
            <FormatAlignLeftIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Align Left</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleAlignSelectInternal("center")}
          selected={activeFormats.has("alignCenter")}
        >
          <ListItemIcon>
            <FormatAlignCenterIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Align Center</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleAlignSelectInternal("right")}
          selected={activeFormats.has("alignRight")}
        >
          <ListItemIcon>
            <FormatAlignRightIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Align Right</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleAlignSelectInternal("justify")}
          selected={activeFormats.has("alignJustify")}
        >
          <ListItemIcon>
            <FormatAlignJustifyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Justify</ListItemText>
        </MenuItem>
      </Menu>

      {/* Emoji Picker Menu */}
      <Menu
        anchorEl={emojiAnchorEl}
        open={Boolean(emojiAnchorEl)}
        onClose={handleEmojiClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { minWidth: 280, mt: 0.5 } }}
      >
        <Box sx={{ p: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ px: 1, pb: 1, display: "block" }}
          >
            Select an emoji
          </Typography>
          <Grid container spacing={0.5}>
            {COMMON_EMOJIS.map((emoji, index) => (
              <Grid key={index}>
                <IconButton
                  size="small"
                  onClick={() => handleEmojiSelectInternal(emoji)}
                  sx={{
                    fontSize: "20px",
                    width: 36,
                    height: 36,
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  {emoji}
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Menu>

      {/* Link Insert Dropdown */}
      <Menu
        anchorEl={linkAnchorEl}
        open={Boolean(linkAnchorEl)}
        onClose={handleLinkClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableAutoFocusItem
        PaperProps={{ sx: { minWidth: 320, mt: 0.5 } }}
      >
        <Box
          sx={{ p: 2 }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Stack spacing={0}>
            <CustomTextField
              autoFocus
              size="small"
              label="Link Text"
              type="text"
              fullWidth
              variant="outlined"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Enter the text to display"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLinkInsert();
                }
              }}
            />
            <CustomTextField
              size="small"
              label="URL"
              type="url"
              fullWidth
              variant="outlined"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLinkInsert();
                }
              }}
            />
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <CustomButton
                size="small"
                onClick={handleLinkClose}
                variant="text"
                sx={{ fontSize: "10px !important" }}
              >
                Cancel
              </CustomButton>
              <CustomButton
                size="small"
                onClick={handleLinkInsert}
                variant="contained"
                disabled={!linkUrl || !linkText}
                sx={{ fontSize: "10px !important" }}
              >
                Apply
              </CustomButton>
            </Box>
          </Stack>
        </Box>
      </Menu>
    </>
  );
};