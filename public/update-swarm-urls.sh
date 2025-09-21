#!/bin/bash

# Script pour remplacer les placeholders avec l'URL Swarm finale
# Usage: ./update-urls.sh "https://votre-hash.swarm-gateways.net"

if [ -z "$1" ]; then
    echo "Usage: $0 <SWARM_URL>"
    echo "Exemple: $0 https://abc123.swarm-gateways.net"
    exit 1
fi

SWARM_URL="$1"

echo "🔄 Remplacement des placeholders avec : $SWARM_URL"

# Liste des fichiers à modifier
FILES="public/*.html public/*.xml"

for file in $FILES; do
    if [ -f "$file" ]; then
        echo "📝 Mise à jour : $file"
        sed -i.bak "s|SWARM_DOMAIN_PLACEHOLDER|$SWARM_URL|g" "$file"
    fi
done

echo "✅ URLs mises à jour ! Vous pouvez maintenant redéployer."
echo "💡 Les fichiers .bak contiennent les versions originales."