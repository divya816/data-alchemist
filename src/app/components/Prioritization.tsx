import { useState } from "react";

export default function Prioritization({ onWeightsChange }: { onWeightsChange: (weights: any) => void }) {
  const [weights, setWeights] = useState({
    priorityLevel: 0.5,
    taskFulfillment: 0.3,
    loadBalance: 0.2
  });

  const handleSliderChange = (key: string, value: number) => {
    const updated = { ...weights, [key]: value };
    setWeights(updated);
    onWeightsChange(updated);
  };

  return (
    <div className="p-4 border rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-2">Set Priorities</h2>
      {Object.entries(weights).map(([key, value]) => (
        <div key={key} className="mb-4">
          <label className="block font-medium mb-1">{key}: {value}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={value}
            onChange={(e) => handleSliderChange(key, parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
}