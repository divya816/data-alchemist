'use client';

import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

export default function RuleBuilder({
  onAddRule,
}: {
  onAddRule: (rule: any) => void;
}) {
  const [ruleText, setRuleText] = useState('');

  const handleAdd = () => {
    if (!ruleText.trim()) return; // prevent empty input

    const rule = {
      type: 'customText',
      description: ruleText.trim(),
    };

    onAddRule(rule);
    setRuleText('');
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        ➕ Add Business Rule
      </Typography>

      <TextField
        fullWidth
        label="Describe your rule"
        variant="outlined"
        value={ruleText}
        onChange={(e) => setRuleText(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleAdd}
        disabled={!ruleText.trim()} // disables button when input is empty
      >
        Add Rule
      </Button>
    </Box>
  );
}