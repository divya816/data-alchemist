'use client';

import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { generateRules } from '../../lib/ruleGenerator';
import { suggestRules } from '../../lib/suggestRules'; // ✅ Import your suggestion logic

export default function ExportPanel({ tasks, clients, workers }: any) {
  const [rules, setRules] = useState<any[]>([]);

  const handleGenerate = () => {
    const generatedRules = generateRules(tasks, clients, workers);
    setRules(generatedRules);
  };

  const handleExport = () => {
    if (rules.length === 0) return;

    const blob = new Blob([JSON.stringify(rules, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'rules.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSuggest = async () => {
    try {
      const suggestedRules = await suggestRules(tasks);
      alert("💡 Suggested rules:\n" + JSON.stringify(suggestedRules, null, 2));
    } catch (error) {
      alert("❌ Failed to suggest rules");
      console.error(error);
    }
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" color="secondary" onClick={handleGenerate}>
        ⚙ Generate Rules
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleExport}
        disabled={rules.length === 0}
      >
        🚀 Export Rules to JSON
      </Button>

      <Button variant="outlined" color="success" onClick={handleSuggest}>
        💡 Suggest Rules
      </Button>
    </Stack>
  );
}