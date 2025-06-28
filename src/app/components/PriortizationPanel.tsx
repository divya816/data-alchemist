interface PrioritizationPanelProps {
  weights: Record<string, number>;
  setWeights: (w: Record<string, number>) => void;
}