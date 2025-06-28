interface ValidationSummaryProps {
  errors: {
    type: string;
    message: string;
    rowIndex: number;
    field?: string;
    suggestion?: string;
  }[];
}