'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import DataGrid from 'react-data-grid';
import { validateClients } from '../lib/validators'; // adjust path as needed

type Row = { [key: string]: string };
type ValidationError = { row: number; messages: string[] };

const CSVUploader = () => {
  const [data, setData] = useState<{
    clients?: Row[];
    workers?: Row[];
    tasks?: Row[];
  }>({});

  const [columns, setColumns] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<'clients' | 'workers' | 'tasks' | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]); // row-wise validation errors

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'clients' | 'workers' | 'tasks') => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Row>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data;

        // ✅ Perform validation only for clients
        if (type === 'clients') {
          const tasks = data.tasks || [];
          const validTaskIDs = new Set(tasks.map((task) => task.TaskID?.trim()));
          const clientErrors = validateClients(parsedData, validTaskIDs);
          setErrors(clientErrors);
        } else {
          setErrors([]); // clear previous errors
        }

        // ✅ Set parsed CSV data
        setData((prev) => ({ ...prev, [type]: parsedData }));
        setSelectedType(type);

        // ✅ Set column headers dynamically
        const cols = Object.keys(parsedData[0] || {}).map((key) => ({
          key,
          name: key,
          editable: true,
        }));
        setColumns(cols);
      },
    });
  };

  const rows = selectedType ? data[selectedType] || [] : [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Your CSV Files</h2>

      <div className="flex flex-col gap-2 mb-4">
        <label>Upload Clients CSV:</label>
        <input type="file" accept=".csv" onChange={(e) => handleFileUpload(e, 'clients')} />

        <label>Upload Workers CSV:</label>
        <input type="file" accept=".csv" onChange={(e) => handleFileUpload(e, 'workers')} />

        <label>Upload Tasks CSV:</label>
        <input type="file" accept=".csv" onChange={(e) => handleFileUpload(e, 'tasks')} />
      </div>

      {/* ✅ Validation summary */}
      {errors.length > 0 && (
        <div className="mt-4 bg-red-100 text-red-800 p-4 rounded border border-red-300">
          <h4 className="font-semibold mb-2">Validation Errors:</h4>
          <ul className="list-disc ml-5">
            {errors.map((err, idx) => (
              <li key={idx}>
                <span className="font-medium">Row {err.row + 1}:</span> {err.messages.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Data grid */}
      {selectedType && (
        <>
          <h3 className="text-lg font-semibold mb-2 capitalize">{selectedType} Data</h3>
          <DataGrid
            columns={columns}
            rows={rows}
            onRowsChange={(updated) => {
              setData((prev) => ({ ...prev, [selectedType]: updated }));
            }}
          />
        </>
      )}
    </div>
  );
};

export default CSVUploader;