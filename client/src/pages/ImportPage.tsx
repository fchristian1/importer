import React, { useState } from 'react';
import { saveFileInChunks } from '../utils/indexedDbImport';
import Button from '../components/Button';
import Input from '../components/Input';

function ImportPage() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage('');
    try {
      await saveFileInChunks(file);
      setMessage('Datei erfolgreich in Chunks gespeichert!');
    } catch (err) {
      setMessage('Fehler beim Speichern: ' + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 bg-white shadow-lg p-8 rounded-xl">
      <h1 className="font-bold text-xl">Import</h1>
      <p>Dateien zum Import auswählen.</p>
      <label className="block w-fit cursor-pointer">
        <Input
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="import-file-input"
        />
        <span tabIndex={0} className="inline-block">
          <Button type="button" onClick={() => document.getElementById('import-file-input')?.click()}>
            Datei auswählen
          </Button>
        </span>
      </label>
      {uploading && <p className="bg-blue-200 mt-2 px-3 py-2 rounded text-blue-700">Speichere Datei ...</p>}
      {message && (
        <p className={
          message.startsWith('Fehler')
            ? 'bg-red-200 text-red-700 rounded px-3 py-2 mt-2'
            : 'bg-green-200 text-green-700 rounded px-3 py-2 mt-2'
        }>{message}</p>
      )}
    </div>
  );
}

export default ImportPage;
