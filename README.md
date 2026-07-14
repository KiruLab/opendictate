# Dictate Whisper Daemon

Un demonio ligero para Linux (optimizando GNOME Wayland) que permite dictado por voz global sin retardo (Zero-Latency) utilizando `faster-whisper`.

## Características
- **Latencia Cero**: El modelo de IA se mantiene cargado en la memoria RAM (Daemon) para estar listo instantáneamente.
- **Burbuja Flotante**: UI minimalista que te indica el estado de la grabación y transcripción.
- **Vista Previa de Texto**: Puedes ver lo que dictaste antes de pegarlo, permitiendo copiar o enviar con un solo clic.
- **Pausar y Cancelar**: Puedes pausar el dictado a medias y retomarlo sin perder contexto, o cancelar por completo.
- **Puntuación verbal**: Puedes decir "abre paréntesis", "cierra comillas", "nueva línea", etc., y el sistema escribirá el símbolo correspondiente automáticamente.
- **Portapapeles Universal**: En Wayland, inyecta el texto simulando la presión de `Ctrl+V` para garantizar total compatibilidad con todos los idiomas y distribuciones de teclado.

### OpenDeck / Stream Deck

La aplicación incluye un plugin nativo para OpenDeck que permite monitorear y controlar la grabación desde un dispositivo físico (o un emulador en el teléfono).

**Instalación del Plugin OpenDeck**:
Existen tres formas de instalarlo:
1. **Automática (Recomendado):** Al instalar Dictate Whisper usando `install.sh`, el plugin queda disponible internamente. Puedes instalarlo y conectarlo haciendo clic en el icono del micrófono en la barra de estado y seleccionando `OpenDeck: No Instalado (Click para Instalar)`. Esto copiará el plugin a tu carpeta de OpenDeck y reiniciará OpenDeck automáticamente.
2. **Si ya tienes OpenDeck abierto:** Simplemente haz clic en el botón `Reinstalar/Reconectar OpenDeck` desde el icono de estado de Dictate Whisper para forzar el reinicio de la conexión si alguna vez se queda pegado.
3. **Manual:** Copia la carpeta `plugins/com.butcherwutcher.dictate.sdplugin` a `~/.config/opendeck/plugins/` y reinicia OpenDeck.

## Instalación

Clona el repositorio e inicia el script de instalación automática:
```bash
./install.sh
```

## Uso

Configura atajos de teclado o botones en tu OpenDeck / StreamDeck asignando los siguientes comandos de bash:

1. **Iniciar Grabación**:
   ```bash
   ~/.local/share/dictate-whisper/dictate-client.py --record
   ```
2. **Pausar/Reanudar Grabación**:
   ```bash
   ~/.local/share/dictate-whisper/dictate-client.py --pause
   ```
3. **Cancelar Grabación / Cerrar Vista Previa**:
   ```bash
   ~/.local/share/dictate-whisper/dictate-client.py --cancel
   ```
4. **Finalizar y Mostrar Vista Previa**:
   ```bash
   ~/.local/share/dictate-whisper/dictate-client.py --preview
   ```
5. **Finalizar y Pegar Inmediatamente** (deja un espacio al final):
   ```bash
   ~/.local/share/dictate-whisper/dictate-client.py --paste
   ```
6. **Finalizar, Pegar y Enviar** (presiona Enter al final):
   ```bash
   ~/.local/share/dictate-whisper/dictate-client.py --send
   ```
7. **Activar/Desactivar Limpieza con LLM (Gemma 4/Gemini)**:
   ```bash
   ~/.local/share/dictate-whisper/dictate-client.py --toggle-llm
   ```

*(Nota: En la interfaz de la Vista Previa, tendrás botones interactivos para Copiar al Portapapeles, Pegar normal, Pegar+Enter, y Cerrar)*
