import { type SxProps } from "@mui/material";

export interface DaysLeftChipProps {
    days: number; 
   showAsToGo?: boolean;
  }

export interface ChipContainerProps {
    color: string;
    backgroundColor: string;
    borderColor: string;
  }

export interface StatusChipProps {
    status: 'Rejected' | 'Approved' | 'Pending' | 'Recalled' | 'Ongoing' | 'Upcoming' | 'Inactive'|'Active' |'Orange'|'Overdue'|'Completed'|'Defaulted'; 
    sx?:SxProps;
    fontSize?:string;
    displayText?: string;
    tooltip?:string
  }