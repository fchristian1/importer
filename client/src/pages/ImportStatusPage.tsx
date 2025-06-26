import React from 'react';

// Platzhalter-Daten für Importdateien
const importFiles = [
  { name: 'import1.csv', status: 'hochgeladen' },
  { name: 'import2.csv', status: 'in Bearbeitung' },
  { name: 'import3.csv', status: 'fertig' },
];

const ImportStatusPage: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4 font-bold text-xl">Importdateien Status</h1>
      <table className="border border-gray-300 min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Dateiname</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {importFiles.map((file) => (
            <tr key={file.name}>
              <td className="px-4 py-2 border">{file.name}</td>
              <td className="px-4 py-2 border">{file.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImportStatusPage;
