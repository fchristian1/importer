// src/utils/indexedDbImport.ts
// Hilfsfunktionen für das chunkweise Speichern von Dateien in die IndexedDB

const DB_NAME = 'importer';
const STORE_NAME = 'importFiles';
const DB_VERSION = 1;

export async function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveFileInChunks(file: File, chunkSize = 1024 * 1024) {
  const db = await openDb();
  let offset = 0;
  let chunkIndex = 0;
  while (offset < file.size) {
    const chunk = file.slice(offset, offset + chunkSize);
    // FileReader synchronisiert nutzen
    const data = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(chunk);
    });
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.add({
        fileName: file.name,
        chunkIndex,
        data,
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => {};
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
    offset += chunkSize;
    chunkIndex++;
  }
  db.close();
}

export async function getFileChunks(fileName: string) {
  const db = await openDb();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return new Promise<any[]>((resolve, reject) => {
    const chunks: any[] = [];
    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        if (cursor.value.fileName === fileName) {
          chunks.push(cursor.value);
        }
        cursor.continue();
      } else {
        resolve(chunks);
      }
    };
    request.onerror = reject;
  });
}
