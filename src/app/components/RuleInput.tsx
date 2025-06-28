import { useState } from "react";

export default function RuleInput({ onRulesChange }: { onRulesChange: (rules: any[]) => void }) {
  const [taskInput, setTaskInput] = useState("");
  const [rules, setRules] = useState<any[]>([]);

  const handleAddRule = () => {
    const tasks = taskInput.split(",").map((t) => t.trim());
    const newRule = { type: "coRun", tasks };
    const updated = [...rules, newRule];
    setRules(updated);
    onRulesChange(updated);
    setTaskInput("");
  };

  return (
    <div className="p-4 border rounded-lg shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Add Co-Run Rule</h2>
      <input
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="T1,T2"
        className="border p-2 rounded w-full mb-2"
      />
      <button onClick={handleAddRule} className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Rule
      </button>
      <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">{JSON.stringify(rules, null, 2)}</pre>
    </div>
  );
}