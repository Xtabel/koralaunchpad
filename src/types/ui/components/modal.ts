import { type ReactNode } from "react";

type ConfirmType = "caution" | "confirm" | "success";

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  hideSecondaryAction?: boolean;
  customActions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  fullScreen?: boolean;
  width?: string;
  height?: string;
  confirm?: { type: ConfirmType; message: string | ReactNode};
  rightOffset?: number;
  isCenter?: boolean;
  error?:boolean;
  primaryActionDisabled?:boolean;
  loading?:boolean;
  noActionButton?: boolean;
  overflow?: string;
}

