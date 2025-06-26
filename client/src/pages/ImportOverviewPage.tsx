import ImportStatusPage from './ImportStatusPage';

function ImportOverviewPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-xl">Import Übersicht</h1>
      <p>Überblick über den Importprozess.</p>
      <div className="mt-8">
        <ImportStatusPage />
      </div>
    </div>
  );
}

export default ImportOverviewPage;
