export interface EmployeeIdeasDTO {
  firstName?: string;
  lastName?: string;
  categoryId: number;
  employeeId: number;
  idea: string;
  ideaTitle: string;
  isAnonymous: boolean;
  sharedDate: string;
  id: number;
  ideaCategory?: string;
  fileName?:string;
  fileType?:string;
  documentId?: number | null;
}
