interface AIAssistPanelProps {
  suggestions: {
    type: string;
    message: string;
    action: () => void;
  }[];
}