# OpenDictate

A powerful and versatile local dictation assistant for Linux (Wayland/X11) powered by `faster-whisper`.
OpenDictate runs in the background and allows you to dictate text into any application, rewrite it using Artificial Intelligence (Gemma/Gemini), and control everything via keyboard shortcuts or an Elgato Stream Deck using **OpenDeck**.

## 🌍 Multilingual Capabilities
Thanks to the robust architecture of OpenAI's Whisper models, OpenDictate natively supports multilingual transcription. You can dictate in English, Spanish, French, German, Italian, Portuguese, and many other languages. The tool allows you to:
- Automatically detect the spoken language.
- Force transcription into a specific language for improved accuracy.
- Translate your voice from any supported language into English on the fly.

## 🚀 Key Features

* **100% Local and Private**: Uses Whisper models running entirely on your local machine.
* **AI Integration (Optional)**: Transcribe and rewrite your text using Google Gemini (API).
* **Smart Media Control**: Automatically pauses your music or podcasts when you start recording and resumes when finished.
* **Per-App Profiles**: Define specific copy/paste behaviors for each program (useful for terminal, code editors, or browsers).
* **Floating Bubble**: Immediate visual feedback while you speak.
* **OpenDeck Integration**: Native plugin to control recording, AI, and settings directly from your Stream Deck.

---

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KiruLab/opendictate.git
   cd opendictate
   ```
2. Run the installation script:
   ```bash
   ./install.sh
   ```
   *The script will install the required Ubuntu dependencies (xdotool, wl-clipboard, libayatana, etc.), create a virtual environment in `~/.local/share/dictate-whisper` and download the Python packages.*

3. You can find the app shortcut in your application drawer. Open it to access the Settings UI where you can configure your API Key, Whisper model, languages, and app profiles.

---

## ⌨️ Usage with Keyboard Shortcuts (CLI)

If you don't have a Stream Deck, you can control OpenDictate by assigning commands to your desktop environment's keyboard shortcuts (GNOME, KDE, Hyprland, etc.).

Available commands using the `dictate` binary:

| Command | Description |
|---------|-------------|
| `dictate --toggle-record-send` | **(Recommended)** Starts recording, resumes if paused, or finishes and sends using the active AI config. |
| `dictate --record` | Starts recording (or resumes if paused). |
| `dictate --pause` | Pauses the current recording without sending. |
| `dictate --cancel` | Cancels the current recording and discards the audio. |
| `dictate --preview` | Stops the recording and keeps the text in the bubble for review. |
| `dictate --send` | Simulates the "Enter" key after pasting the text. |
| `dictate --toggle-ai` | Toggles the AI rewriting feature on or off. |
| `dictate --toggle-autosend` | Toggles the global auto-send (automatic Enter). |
| `dictate --toggle-autopause` | Toggles automatic pausing of media during recording. |
| `dictate --toggle-bubble` | Hides/Shows the floating feedback bubble. |

---

## 🎛️ Usage with OpenDeck (Stream Deck)

OpenDictate includes a full plugin for **OpenDeck**, perfect for having physical buttons with real-time visual feedback.

### OpenDeck Plugin Installation

1. Make sure you have [OpenDeck](https://github.com/viktorgino/OpenDeck) installed and running.
2. The `install.sh` script automatically copies the plugin to your OpenDeck configuration folder.
3. **Restart the OpenDeck application**.
4. In the OpenDeck configuration interface, look for the **"OpenDictate"** category.

### Available Actions in OpenDeck

* **Record**: A dynamic button that changes color and state depending on whether you are recording, paused, or idle.
* **Cancel**: Cancels the ongoing recording.
* **Send**: Finishes the recording and pastes the text (uses AI if enabled by the toggle).
* **Monitor**: Empty button used to monitor daemon status.
* **Toggle Auto-Send**: Turns the global auto-send on or off.
* **Toggle AI Cleaning**: Turns the AI rewriting feature on or off.
* **Toggle Auto-Pause**: Turns automatic media pausing on or off.
* **Toggle Bubble Visibility**: Turns the floating feedback bubble on or off.
* **Preview (Review)**: Keeps the transcribed text in the bubble for review.

---

## ⚖️ License and Credits

* **License**: Released under the MIT License. Copyright (c) 2026 Kirulab / Tomás D. López.
* The visual icons used in this application and the OpenDeck plugin were provided by [Icons8](https://icons8.com) under the Icons8 Free License.
* Uses `faster-whisper` (MIT) and Google Gemini API (Apache 2.0).
