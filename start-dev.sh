#!/usr/bin/env bash

set -euo pipefail

STASHED=0
STASH_NAME="start-dev-autostash-$(date +%Y%m%d-%H%M%S)"

# Shopify CLI asks for confirmation if the git tree is dirty.
if ! git diff --quiet || ! git diff --cached --quiet || [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
	echo "Hay cambios locales sin commitear. Guardando stash temporal..."
	git stash push --include-untracked -m "$STASH_NAME" >/dev/null
	STASHED=1
fi

shopify theme pull --theme=188752331116 --store=qdm-dev.myshopify.com --only "templates/*.json"

# Commitear si hubo cambios:
git add templates/ && git commit -m "chore: sync templates" || true

if [[ $STASHED -eq 1 ]]; then
	echo "Restaurando cambios locales..."
	if ! git stash pop >/dev/null; then
		echo "No se pudo aplicar el stash automaticamente. Revisá 'git stash list' y resolvelo manualmente." >&2
		exit 1
	fi
fi

# Luego arrancar el server:
shopify theme dev --store=qdm-dev.myshopify.com
