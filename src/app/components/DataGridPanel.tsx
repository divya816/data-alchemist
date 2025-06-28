interface DataGridPanelProps {
  title: string;
  data: any[];
  setData: (updatedData: any[]) => void;
  errors: Record<string, string>;
  entityType: "clients" | "workers" | "tasks";
}