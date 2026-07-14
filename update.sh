#!/bin/bash

INSTALL_DIR="$HOME/.local/share/dictate-whisper"

echo "🔄 Actualizando archivos del sistema..."

cp dictate-daemon.py "$INSTALL_DIR/"
cp dictate-client.py "$INSTALL_DIR/"
cp dictate_config_ui.py "$INSTALL_DIR/"
cp -r plugins "$INSTALL_DIR/"

echo "📦 Instalando plugin en OpenDeck..."
rm -rf "$HOME/.config/opendeck/plugins/com.butcherwutcher.dictate.sdplugin"
rm -rf "$HOME/.config/opendeck/plugins/com.kirulab.dictate.sdplugin"
cp -r plugins/com.kirulab.dictate.sdplugin "$HOME/.config/opendeck/plugins/"

chmod +x "$INSTALL_DIR/dictate-daemon.py"
chmod +x "$INSTALL_DIR/dictate-client.py"
cp "$INSTALL_DIR/dictate-client.py" "$HOME/.local/bin/dictate"
chmod +x "$HOME/.local/bin/dictate"

echo "🔄 Reiniciando demonio..."
pkill -9 -f dictate-daemon.py
sleep 1
nohup "$INSTALL_DIR/.venv/bin/python" "$INSTALL_DIR/dictate-daemon.py" >/dev/null 2>&1 &

echo "✅ Actualización completada."
