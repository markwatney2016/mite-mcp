#!/usr/bin/env bash
# Prüft, ob der Server exakt die erlaubten lesenden Tools anbietet.
# Aufruf: scripts/check-readonly.sh [Startbefehl]   (Standard: mite-mcp-readonly)
set -uo pipefail
CMD="${1:-mite-mcp-readonly}"
EXPECTED="get_customer get_daily_time_entries get_project get_service get_stopwatch_status get_time_entry get_time_entry_summary list_customers list_projects list_services list_time_entries"
ACTUAL=$( (printf '%s\n' \
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"check","version":"1"}}}' \
  '{"jsonrpc":"2.0","method":"notifications/initialized"}' \
  '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'; sleep 2) \
  | MITE_ACCOUNT_NAME=x MITE_API_KEY=x NODE_ENV=production $CMD 2>/dev/null \
  | grep -oE '"name":"[a-z_]+"' | sed -E 's/"name":"([a-z_]+)"/\1/' | LC_ALL=C sort | tr '\n' ' ' | sed 's/ $//')
if [ "$ACTUAL" = "$EXPECTED" ]; then
  echo "OK: nur die 11 lesenden Tools werden angeboten."
else
  echo "FEHLER: Tool-Liste weicht ab."
  echo "Erwartet: $EXPECTED"
  echo "Erhalten: ${ACTUAL:-<keine Antwort>}"
  exit 1
fi
