# OpenDictate

Un potente y versátil asistente de dictado local para Linux (Wayland/X11) impulsado por `faster-whisper`.
OpenDictate corre en segundo plano y te permite dictar texto en cualquier aplicación, reescribirlo usando Inteligencia Artificial (Gemma/Gemini), y controlar todo mediante atajos de teclado o desde un Elgato Stream Deck usando **OpenDeck**.

## Características Principales

* **100% Local y Privado**: Utiliza modelos de Whisper que corren en tu propia máquina.
* **Integración con IA (Opcional)**: Transcribe y reescribe tu texto usando Google Gemini (API).
* **Control Inteligente de Medios**: Pausa tu música o podcasts automáticamente cuando empiezas a grabar.
* **Perfiles por Aplicación**: Define comportamientos de copiado/pegado específicos para cada programa (útil para la terminal, editores de código o navegadores).
* **Burbuja Flotante**: Retroalimentación visual inmediata mientras hablas.
* **Integración con OpenDeck**: Plugin nativo para controlar la grabación, la IA y los ajustes desde tu Stream Deck.

---

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/dictate-whisper.git
   cd dictate-whisper
   ```
2. Ejecuta el script de instalación:
   ```bash
   ./install.sh
   ```
   *El script instalará las dependencias necesarias de Ubuntu (xdotool, wl-clipboard, libayatana, etc.), creará un entorno virtual en `~/.local/share/dictate-whisper` y descargará los paquetes de Python.*

3. La aplicación de configuración gráfica se abrirá automáticamente. Allí podrás configurar tu API Key (si deseas usar IA), el modelo de Whisper, y los perfiles de tus aplicaciones.

---

## ⌨️ Uso con Atajos de Teclado (CLI)

Si no tienes un Stream Deck, puedes controlar OpenDictate asignando comandos a los atajos de teclado de tu entorno de escritorio (GNOME, KDE, Hyprland, etc.).

Comandos disponibles usando el binario `dictate`:

| Comando | Descripción |
|---------|-------------|
| `dictate --toggle-record-send` | **(Recomendado)** Inicia grabación, reanuda si está en pausa, o termina y envía usando la config de IA activa. |
| `dictate --record` | Inicia la grabación (o la reanuda si estaba pausada). |
| `dictate --pause` | Pausa la grabación actual sin enviarla. |
| `dictate --cancel` | Cancela la grabación actual y descarta el audio. |
| `dictate --preview` | Detiene la grabación y mantiene el texto en la burbuja para revisión. |
| `dictate --finish-normal` | Termina la grabación y la inserta como texto normal. |
| `dictate --finish-ai` | Termina la grabación, la procesa por la IA (Gemma/Gemini) y luego la inserta. |
| `dictate --send` | Simula la tecla "Enter" luego de pegar el texto. |
| `dictate --toggle-autosend` | Activa/Desactiva el auto-envío (Enter automático) de forma global. |
| `dictate --toggle-autopause` | Activa/Desactiva el pausado automático de música durante la grabación. |
| `dictate --toggle-bubble` | Oculta/Muestra la burbuja flotante en pantalla. |

**Ejemplo de configuración en GNOME:**
1. Ve a Configuración > Teclado > Ver y personalizar atajos > Atajos personalizados.
2. Crea un atajo llamado "Grabar/Enviar Dictado" con el comando: `dictate --toggle-record-send` y asígnale, por ejemplo, `Ctrl+Alt+R`.
3. Crea un atajo para "Cancelar Dictado" con: `dictate --cancel` y asígnale `Ctrl+Alt+C`.

---

## 🎛️ Uso con OpenDeck (Stream Deck)

OpenDictate incluye un plugin completo para **OpenDeck**, ideal para tener botones físicos con retroalimentación visual en tiempo real.

### Instalación del Plugin OpenDeck

1. Asegúrate de tener [OpenDeck](https://github.com/viktorgino/OpenDeck) instalado y corriendo.
2. El script `install.sh` ya habrá copiado el plugin a tu carpeta de plugins de OpenDeck (`~/.local/share/OpenDeck/plugins/`).
3. **Reinicia la aplicación OpenDeck**.
4. En la interfaz de configuración de OpenDeck, busca la categoría **"OpenDictate"**.

### Acciones Disponibles en OpenDeck

* **Record / Pause / Resume**: Un botón dinámico que cambia de color y estado según si estás grabando, en pausa o inactivo.
* **Cancel Recording**: Cancela la grabación en curso.
* **Send (Raw Text)**: Finaliza la grabación y pega el texto crudo.
* **Send to AI**: Finaliza la grabación, la procesa mediante IA y la pega en la aplicación activa.
* **Toggle Auto-Send**: Enciende o apaga el envío automático global (Enter automático tras pegar).
* **Toggle AI**: Activa o desactiva la sugerencia inteligente de usar la IA basándose en el contexto visual de la pantalla.
* **Toggle Auto-Pause**: Activa o desactiva la pausa automática de tus medios (Spotify, VLC) al grabar.
* **Toggle Bubble Visibility**: Activa o desactiva la burbuja flotante de retroalimentación.

---

## ⚖️ Licencia y Créditos

* Los iconos visuales utilizados en esta aplicación y en el plugin de OpenDeck fueron provistos por [Icons8](https://icons8.com) bajo la Licencia Gratuita de Icons8.
* Desarrollado para uso libre.
