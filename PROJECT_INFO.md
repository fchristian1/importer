# Projektinformation: Importer

## Projektbeschreibung

Dieses Projekt ist eine Webanwendung zur Verwaltung und zum Importieren von Datenquellen. Es unterstützt verschiedene Schritte wie Import, Mapping, Transformation, Upload und Online-Check. Zusätzlich gibt es einen Bereich für Datenübersicht, Quellen und Datenbereinigung.

### TODO-Liste (bitte gemeinsam pflegen)

- [x] Übersicht-Seite: Tabelle mit Status der Importdateien anzeigen und in die Importübersicht einbinden
- [ ] Erstelle eine dateiliste die aussagen über den inhalt treffen.
- [ ] Import: Daten chunkweise in die IndexDB:Import:binary des Browsers laden
- [ ] Rohdaten: CSV/Text-Daten anzeigen, bearbeiten, speichern (mit Codierung), doppelte Leerzeilen vereinfachen, \n \r innerhalb der Zeile entfernen (außer am Ende)
- [ ] Mapping: Daten auf globale MAP mappen, Tabellen für Datenüberschriften, Mapping-Auswahl, finale Mapping-Tabelle
- [x] Navigation und Seitenstruktur anpassen: `Routes.tsx` und `pages/` verwenden
- [ ] Layout: MainLayout so gestalten, dass Footer/Statusleiste immer unten bleibt, Scrollverhalten in Komponenten regeln
- [ ] Funktionen, die nichts mit der UI zu tun haben, auslagern
- [ ] Zweckgebundene Funktionen gruppieren

## Haupttechnologien

- React (mit TypeScript)
- Vite (Build-Tool)
- Tailwind CSS (Styling)
- React Router (Routing)

## Ordnerstruktur (Auszug)

- `src/` – Quellcode der Anwendung
  - `pages/` – Einzelne Seiten (z.B. Import, Mapping, DataOverview)
  - `context/` – React Context für globale Zustände
  - `assets/` – Statische Assets wie Bilder
- `public/` – Öffentliche Dateien
- `index.html` – Einstiegspunkt der App

## Struktur der Anwendung

- Import von Daten
  - Übersicht - gibt eien übersicht über den status der import dateien als tabelle.
  - Import: Lädt die daten chunkweise in die IndexDB:Import:binary des Browsers.
  - Rohdaten: hier werden die CSV oder Text daten angezeigt und können bearbeitet werden. Öffnen mit der Codierung. Speichern mit der Codierung. Und dann sowas wie mach aus doppelten Leerzeilen Einfache. Und entfernt \n \r innerhalb det Zeile ausser am ende.
  - Mapping: hier werden die Daten auf eine globale MAP gemappt. mit einer Tabelle die die Datenmit überschrifften anzeigt und darüber kann man das Globale Mapping mit Auswahlfeldern setzten. Und eine Tabelle die das Globale Mapping Namen zeigt und darüber kann man die DatenÜberschriftten auswählen, darunter erscheinen dann die Daten die ich ausgewählt habe. Und eine Tabelle die das Finale Mapping anzeigt ohne Daten.

## Entwicklung

- Starten der App: `npm run dev` im `client`-Verzeichnis
- Build: `npm run build`
- Linting: `npm run lint`

## Hinweise

- Navigation und Seiten sind im `Routes.tsx` und in `pages/` definiert.
- Das Layout und die Navigation passen sich je nach Route an (Import- oder Datenbereich).
- Das Scrollverhalten wird in den Komponenten gerregelt. Das MainLayout ist fest, sodas zb die Statusleiste(footer) unten stehen bleibt.
- Für globale Zustände wird der `ImporterProvider` verwendet.
- Funktionen die nichts mit der UI zu tun haben immer auslagern.
- Funktionen die einem zwek dinen immer gruppieren in einer Datei.

## Farbkonzept

- Haupt-Button und wichtige Interaktionen: `bg-amber-200`, `border-gray-200`, Text: `text-gray-800`, Hover: `bg-amber-300`
- Neutrale Flächen: `bg-white` oder `bg-gray-50`
- Status- und Feedbackfarben: z. B. `bg-blue -200 text-blue-700` (Info), `bg green.200 text-green-700` (Erfolg), `bg-red-200 text-red-700` (Fehler) bei Buttons oder nur text- bei text zb Fehlermeldungen und bg- bei Buttons wie ja oder nein
- Navigation und Layout: dezente Grautöne für Ränder und Hintergründe und Schatten für klickbare Elemente

Diese Farben werden für Buttons, Dateiauswahlfelder und andere interaktive Elemente im gesamten Projekt verwendet, um ein einheitliches, freundliches und modernes Erscheinungsbild zu gewährleisten.

## Ansprechpartner

- (Hier können Kontaktinfos oder Links zu weiteren Ressourcen ergänzt werden)
