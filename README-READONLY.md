# mite-mcp-readonly

Schreibgeschützter Fork von [MarceloEmmerich/mite-mcp](https://github.com/MarceloEmmerich/mite-mcp) (Basis: Version 0.1.5).

## Zweck

Der Original-Server bietet 26 Tools für die mite-API an, darunter Tools, die Daten anlegen, ändern oder löschen und die Stoppuhr steuern. Dieser Fork registriert ausschließlich die folgenden 11 lesenden Tools:

| Tool | Tool |
|---|---|
| `get_customer` | `get_time_entry_summary` |
| `get_daily_time_entries` | `list_customers` |
| `get_project` | `list_projects` |
| `get_service` | `list_services` |
| `get_stopwatch_status` | `list_time_entries` |
| `get_time_entry` | |

Alle 11 Tools greifen nur über `apiClient.get` auf die mite-API zu. Die übrigen 15 Tools sind im Quellcode weiterhin vorhanden, werden aber weder in der Tool-Liste angeboten noch ausgeführt: Ein Aufruf endet mit `Tool <name> not found`. Das gilt für den stdio- und den HTTP-Modus.

## Unterschiede zu upstream

| Datei | Änderung |
|---|---|
| `src/index.ts` | Das Objekt `allTools` wird über die Whitelist `READ_ONLY_TOOLS` gefiltert. Tool-Liste (`tools/list`) und Tool-Ausführung (`tools/call`) basieren beide auf `allTools`. |
| `package.json` | name `mite-mcp-readonly`, version `0.1.5-readonly.1`, bin `mite-mcp-readonly`, `build` über `tsconfig.build.json`, `files` = `dist` und `npm-shrinkwrap.json`. Es gibt kein `prepare`-Skript. |
| `tsconfig.build.json` | Erbt von `tsconfig.json` und schließt zusätzlich `src/__tests__` aus. Die 4 Typfehler dort bestehen upstream und werden nicht behoben. |
| `.gitignore` | Die Zeile `dist/` ist entfernt. |
| `dist/` | Wird mitversioniert (Build-Ergebnis). |
| `npm-shrinkwrap.json` | Wird mitversioniert und fixiert die Abhängigkeiten. |
| `scripts/check-readonly.sh` | Prüfskript, siehe unten. |

Warum `dist/` mitversioniert wird und es kein `prepare`-Skript gibt: Ein `prepare`-Skript würde bei `npm install -g` bauen. Dabei kann ein global installiertes TypeScript 6 verwendet werden, das wegen `moduleResolution: "node"` mit Fehler TS5107 abbricht.

Warum `npm-shrinkwrap.json`: Bei der Installation als Paket beachtet npm nur eine `npm-shrinkwrap.json`, keine `package-lock.json`, und nur, wenn sie in `files` aufgeführt ist.

Der Branch `main` bleibt unverändert und entspricht upstream. Alle Änderungen liegen auf dem Branch `readonly`.

## Installation

Voraussetzungen: git, Node.js ≥ 18, npm.

```bash
npm install -g github:markwatney2016/mite-mcp#v0.1.5-readonly.1
```

Das installiert den Befehl `mite-mcp-readonly` unter `$(npm prefix -g)/bin/`.

### In Claude Code registrieren

```bash
claude mcp add --transport stdio --scope user --env MITE_ACCOUNT_NAME=<ACCOUNT> --env MITE_API_KEY=DEIN_KEY mite -- mite-mcp-readonly
```

- `<ACCOUNT>` ist die Subdomain des mite-Accounts (`<ACCOUNT>.mite.de`), `DEIN_KEY` der persönliche mite-API-Schlüssel.
- Existiert bereits ein Server namens `mite`, vorher `claude mcp remove mite` ausführen.
- Danach Claude Code neu starten und mit `/mcp` prüfen.
- Wird der Befehl nicht gefunden, statt `mite-mcp-readonly` den absoluten Pfad `$(npm prefix -g)/bin/mite-mcp-readonly` angeben.

## Prüfung

`scripts/check-readonly.sh` startet den Server, sendet `initialize` und `tools/list` über stdio und vergleicht die gelieferten Tool-Namen mit der erwarteten Liste. Das Skript verwendet Platzhalter-Zugangsdaten (`MITE_API_KEY=x`). Es braucht keinen echten API-Schlüssel und verbindet sich nicht mit mite.

```bash
# lokaler Build (im Repository)
scripts/check-readonly.sh "node dist/index.js"

# globale Installation
scripts/check-readonly.sh
```

Erwartete Ausgabe: `OK: nur die 11 lesenden Tools werden angeboten.` Bei einer Abweichung meldet das Skript `FEHLER`, zeigt die erwartete und die erhaltene Liste und endet mit Exit-Code 1.

## Update auf eine neue upstream-Version

Alle Befehle im Repository-Verzeichnis auf dem Branch `readonly` ausführen.

1. Änderungen holen:
   ```bash
   git checkout readonly
   git fetch upstream
   ```
2. Änderungen sichten und zusammenfassen, bevor gemergt wird:
   ```bash
   git diff --stat readonly...upstream/main
   git diff readonly...upstream/main
   ```
   Dabei insbesondere prüfen:
   - **Tools:** neue oder geänderte Tools in `src/tools/` (`name: '...'`) und Änderungen in `src/index.ts`. Wird die Tool-Liste oder die Tool-Ausführung nicht mehr über `allTools` abgewickelt, wirkt die Whitelist womöglich nicht mehr.
   - **Abhängigkeiten:** `package.json` (dependencies, neue `scripts` wie `preinstall`, `postinstall` oder `prepare`).
   - **Netzwerkzugriffe:** `src/utils/api-client.ts` und neue `fetch`- oder `http`-Aufrufe sowie neue Hosts.
   - **Claude-Code-Projektdateien:** `.claude/settings.json`, `.mcp.json`, `CLAUDE.md`. Upstream versioniert eine `.claude/settings.json` mit `enableAllProjectMcpServers: true` und weitreichenden Bash-Freigaben. Sie wirkt, wenn Claude Code in diesem Verzeichnis gestartet wird.
3. Mergen:
   ```bash
   git merge upstream/main
   ```
   Konflikte in `package.json` so auflösen, dass name, bin, files und build aus diesem Fork erhalten bleiben. Die Version folgt dem Schema `<upstream-version>-readonly.<n>`.
4. Abhängigkeiten installieren:
   ```bash
   npm ci
   ```
   Haben sich die Abhängigkeiten geändert, stattdessen `npm install` ausführen, damit `npm-shrinkwrap.json` aktualisiert wird. `npm ci` bricht ab, wenn `package.json` und `npm-shrinkwrap.json` nicht zusammenpassen.
5. Bauen und lokal prüfen:
   ```bash
   npm run build
   scripts/check-readonly.sh "node dist/index.js"
   ```
6. Committen, taggen und pushen (Beispiel-Tag `v0.1.6-readonly.1`, er muss zur Version in `package.json` passen):
   ```bash
   git add -A
   git commit -m "Merge upstream <version> in readonly"
   git tag v0.1.6-readonly.1
   git push origin readonly --tags
   ```
7. Global installieren und prüfen:
   ```bash
   npm install -g github:markwatney2016/mite-mcp#v0.1.6-readonly.1
   scripts/check-readonly.sh
   ```
   Danach Claude Code neu starten.

Neue Tools bleiben durch die Whitelist automatisch ausgeblendet. Soll ein neues lesendes Tool aufgenommen werden, müssen die Whitelist `READ_ONLY_TOOLS` in `src/index.ts` und `EXPECTED` in `scripts/check-readonly.sh` angepasst werden. Im Prüfskript muss dann auch die Anzahl in der OK-Meldung angepasst werden.
