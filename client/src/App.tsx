import { useState } from 'react';
import { read, utils } from 'xlsx';
import Papa from 'papaparse';
import './App.css';
import './index.css';
import NavBar from './NavBar';
import type { RawData, Mapping, Transformations } from './types';
const Step = {
  Upload: 0,
  Mapping: 1,
  Transform: 2,
  Finish: 3,
} as const;
type Step = (typeof Step)[keyof typeof Step];

function App() {
  const [step, setStep] = useState<Step>(Step.Upload);
  const [fileName, setFileName] = useState('');
  const [table, setTable] = useState<string[][]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [rules, setRules] = useState<Record<string, string>>({});

  const handleFile = async (file: File) => {
    setFileName(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext) return;
    if (['csv'].includes(ext)) {
      const text = await file.text();
      const parsed = Papa.parse<string[]>(text, { skipEmptyLines: true });
      setTable(parsed.data as string[][]);
      localStorage.setItem('rawData', JSON.stringify({ fileName: file.name, encoding: 'utf-8', data: text } as RawData));
    } else if (['xls', 'xlsx', 'xlsm'].includes(ext)) {
      const arrayBuffer = await file.arrayBuffer();
      const wb = read(arrayBuffer, { type: 'array' });
      const firstSheet = wb.SheetNames[0];
      const ws = wb.Sheets[firstSheet];
      const json = utils.sheet_to_json<string[]>(ws, { header: 1 });
      setTable(json as string[][]);
      localStorage.setItem('rawData', JSON.stringify({ fileName: file.name, encoding: 'binary', data: utils.sheet_to_csv(ws) } as RawData));
    }
    setStep(Step.Mapping);
  };

  const handleMappingChange = (index: number, value: string) => {
    setMapping({ ...mapping, [index]: value });
  };

  const handleRuleChange = (index: number, value: string) => {
    setRules({ ...rules, [index]: value });
  };

  const finish = () => {
    const rawData = localStorage.getItem('rawData');
    const mappingJson: Mapping = { fileName, columns: mapping };
    const transformJson: Transformations = { fileName, rules };
    console.log('raw', rawData);
    console.log('mapping', JSON.stringify(mappingJson, null, 2));
    console.log('transform', JSON.stringify(transformJson, null, 2));
    setStep(Step.Finish);
  };

  return (
    <>
      <NavBar />
      <div className="p-4 max-w-4xl mx-auto">
      {step === Step.Upload && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold">Step 1: Datei auswählen</h1>
          <input type="file" accept=".csv,.xls,.xlsx,.xlsm" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      )}
      {step === Step.Mapping && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold">Step 2: Mapping</h1>
          <div className="overflow-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  {table[0]?.map((_, i) => (
                    <th key={i} className="border px-2 py-1">
                      <input className="border p-1" placeholder={`Spalte ${i + 1}`} onChange={e => handleMappingChange(i, e.target.value)} />
                    </th>
                  ))}
                </tr>
                <tr>
                  {table[0]?.map((cell, i) => (
                    <th key={i} className="border px-2 py-1 bg-gray-100">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.slice(1, 6).map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c} className="border px-2 py-1">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white" onClick={() => setStep(Step.Transform)}>Weiter</button>
        </div>
      )}
      {step === Step.Transform && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold">Step 3: Transformationen</h1>
          <div className="overflow-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  {table[0]?.map((cell, i) => (
                    <th key={i} className="border px-2 py-1 bg-gray-100">{cell}</th>
                  ))}
                </tr>
                <tr>
                  {table[0]?.map((_, i) => (
                    <th key={i} className="border px-2 py-1">
                      <input className="border p-1" placeholder="TRANSFORM" onChange={e => handleRuleChange(i, e.target.value)} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.slice(1, 6).map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c} className="border px-2 py-1">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white" onClick={finish}>Fertig</button>
        </div>
      )}
      {step === Step.Finish && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold">Upload abgeschlossen</h1>
          <p>Die JSON-Daten wurden in der Konsole ausgegeben.</p>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
