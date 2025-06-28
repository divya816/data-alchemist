'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  Divider,
  TextField
} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { normalizePhases } from '../lib/utils';
import RuleBuilder from './components/RuleBuilder';
import { askAI, suggestFixes } from '../lib/aiUtils';

export default function HomePage() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [filename, setFileName] = useState('');
  const [rules, setRules] = useState<any[]>([]);
  const [nlQuery, setNlQuery] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [fixSuggestions, setFixSuggestions] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]); // Example: could be filled after validating rows

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = result.data as any[];

        if (!parsedData || parsedData.length === 0) {
          alert('Empty or invalid CSV file.');
          return;
        }

        const normalizedData = parsedData.map((row) => {
          if (row.PreferredPhases) {
            row.PreferredPhases = normalizePhases(row.PreferredPhases);
          }
          return row;
        });

        const cols: GridColDef[] = Object.keys(parsedData[0]).map((key) => ({
          field: key,
          headerName: key,
          width: 180,
          editable: true,
        }));

        const rowData: GridRowsProp = normalizedData.map((row, index) => ({
          id: index,
          ...row,
        }));

        setColumns(cols);
        setRows(rowData);

        // ✅ Example: Fake errors just for testing
        setValidationErrors([
          'Missing ClientID in row 2',
          'Invalid WorkerID in row 3',
        ]);
      },
    });
  };

  const handleNLModification = async () => {
    const prompt = `Modify this data accordingly: ${nlQuery}\n${JSON.stringify(
      rows.slice(0, 3)
    )}`;
    const result = await askAI(prompt);
    setAiOutput(result);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        🧙 Data Alchemist
      </Typography>

      <Typography variant="body1" gutterBottom>
        Upload your CSV file (clients, workers, or tasks)
      </Typography>

      <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
        Upload CSV
        <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
      </Button>

      {filename && (
        <Typography variant="subtitle1" gutterBottom>
          📄 File Loaded: <strong>{filename}</strong>
        </Typography>
      )}

      {rows.length > 0 && (
        <Box sx={{ height: 500, marginTop: 3 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      )}

      {/* 👉 Validation Error Output + Fix Button */}
      {validationErrors.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" color="error">
            ❌ Validation Errors
          </Typography>
          <List>
            {validationErrors.map((err, idx) => (
              <ListItem key={idx}>{err}</ListItem>
            ))}
          </List>

          <Button
            variant="outlined"
            color="warning"
            sx={{ mt: 2 }}
            onClick={async () => {
              const fixes = await suggestFixes(validationErrors, rows);
              setFixSuggestions(fixes);
            }}
          >
            🛠 Suggest Fixes
          </Button>

          {fixSuggestions && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">💡 AI Fix Suggestions:</Typography>
              <pre style={{ background: '#f6f6f6', padding: '1em', borderRadius: 6 }}>
                {fixSuggestions}
              </pre>
            </Box>
          )}
        </Box>
      )}

      {/* 👉 RuleBuilder Integration */}
      <RuleBuilder onAddRule={(rule) => setRules([...rules, rule])} />

      {/* 👉 Show Added Rules */}
      {rules.length > 0 && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">🧾 Business Rules</Typography>
          <List>
            {rules.map((rule, index) => (
              <div key={index}>
                <ListItem>{rule.description}</ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      )}

      {/* 🧠 AI Prompt Section */}
      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h6" gutterBottom>
          💬 AI Command
        </Typography>
        <TextField
          fullWidth
          label="Ask AI to modify your data"
          placeholder="E.g. Change priority to 5 for all clients"
          value={nlQuery}
          onChange={(e) => setNlQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="outlined" onClick={handleNLModification}>
          Apply AI Modification
        </Button>

        {aiOutput && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">AI Output:</Typography>
            <pre style={{ background: '#f4f4f4', padding: '1em', borderRadius: 4 }}>
              {aiOutput}
            </pre>
          </Box>
        )}
      </Box>
    </Box>
  );
}