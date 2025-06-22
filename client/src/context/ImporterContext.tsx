import React, { createContext, useEffect, useState } from 'react';

export interface ImporterState {
  importData: string;
  mappingData: string;
  transformData: string;
  uploadData: string;
  onlineCheckData: string;
}

const defaultState: ImporterState = {
  importData: '',
  mappingData: '',
  transformData: '',
  uploadData: '',
  onlineCheckData: '',
};

interface ImporterContextValue {
  state: ImporterState;
  setState: React.Dispatch<React.SetStateAction<ImporterState>>;
}

export const ImporterContext = createContext<ImporterContextValue>({
  state: defaultState,
  setState: () => {},
});

export function ImporterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ImporterState>(() => {
    const stored = localStorage.getItem('importerState');
    return stored ? (JSON.parse(stored) as ImporterState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('importerState', JSON.stringify(state));
  }, [state]);

  return (
    <ImporterContext.Provider value={{ state, setState }}>
      {children}
    </ImporterContext.Provider>
  );
}
