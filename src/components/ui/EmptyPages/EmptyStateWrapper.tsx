// EmptyStateWrapper.tsx
import { ReactNode } from "react";
import { CircularProgress, EmptyCard } from "@/components/ui";

interface EmptyStateWrapperProps {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isEmpty: boolean;
  onRetry: () => void;
  emptyState: {
    title: string;
    subtitle: string;
    buttonText?: string;
    extraButtons?: ReactNode;
    onButtonClick?: () => void;
    icon?: ReactNode;
  };
  errorState?: {
    title: string;
    subtitle: string;
  };
  noStartIcon?: boolean;
  children: ReactNode;
}
const EmptyStateWrapper = ({
  isLoading,
  // isFetching, // Keep for potential future use
  isError,
  isEmpty,
  onRetry,
  emptyState,
  errorState,
  children,
  noStartIcon = false,
}: EmptyStateWrapperProps) => {
  // Show loading spinner (only initial load)
  if (isLoading) {
    return <CircularProgress />;
  }

  // Show error state
  if (isError) {
    return (
      <EmptyCard
        title={errorState?.title || "Something went wrong"}
        subtitle={errorState?.subtitle || "Unable to load data. Please try again."}
        buttonText="Try Again"
        onClick={onRetry}
        noStartIcon={noStartIcon}
        emptyIcon={emptyState.icon}
      />
    );
  }

  // Show empty state - REMOVED the isFetching check
  if (isEmpty) {
    return (
      <EmptyCard
        title={emptyState.title}
        subtitle={emptyState.subtitle}
        extraButtons={emptyState.extraButtons}
        buttonText={emptyState.buttonText}
        onClick={emptyState.onButtonClick}
        noStartIcon={noStartIcon}
        emptyIcon={emptyState.icon}
      />
    );
  }

  // Show actual data
  return <>{children}</>;
};
export default EmptyStateWrapper;