import os
import json

DEFAULT_LANG = "en"

TRANSLATIONS = {
    "en": {
        "ready": "Ready ({})",
        "recording": "Recording...",
        "paused": "Paused",
        "processing": "Processing...",
        "ai_enabled": "AI: Enabled",
        "ai_disabled": "AI: Disabled",
        "autosend_enabled": "Auto-Send: Enabled",
        "autosend_disabled": "Auto-Send: Disabled",
        "autopause_enabled": "Auto-Pause Media: Enabled",
        "autopause_disabled": "Auto-Pause Media: Disabled",
        "bubble_visible": "Bubble: Visible",
        "bubble_hidden": "Bubble: Hidden",
        "error": "Error: {}",
        "copied": "Copied to clipboard",
        "quit": "Quit",
        "settings": "Settings",
        
        "close": "Close",
        "copy_clipboard": "Copy to clipboard",
        "insert_text": "Insert (depends on config)",
        "loading_model": "Loading model...",
        "loading_model_param": "Loading {size}...",
        "whisper_model": "Whisper Model",
        "auto_send": "Auto-Send (Enter)",
        "ai_cleanup": "AI Cleaning",
        "opendeck_installed": "✅ OpenDeck: Installed",
        "opendeck_not_installed": "❌ OpenDeck: Not Installed",
        "error_opening_config": "Could not open settings.",
        "opendeck": "OpenDeck",
        "opendeck_installed_success": "OpenDeck plugin installed successfully.",
        "error_plugin_not_found": "Source plugin not found.",
        "error_whisper": "Whisper Error",
        "error_loading_model": "Error loading model",

        "settings_title": "Settings - OpenDictate",
        "tab_general": "General",
        "tab_apps": "Applications",
        "tab_ai": "AI & Models",
        "tab_advanced": "Advanced",
        
        "ui_language": "UI Language:",
        "transcription_language": "Transcription Language:",
        "transcription_auto": "Automatic",
        
        "lbl_autosend": "Auto-Send (Enter):",
        "lbl_ai_enabled": "AI Cleaning:",
        "lbl_hide_bubble": "Hide Bubble (OpenDeck Mode):",
        "lbl_auto_pause": "Pause media when recording:",
        "lbl_autostart": "Start automatically with system:",
        
        "btn_save_general": "Save General Settings",
        "btn_save_ai": "Save AI Settings",
        "btn_save_adv": "Save Advanced Settings",
        
        "lbl_provider": "API Provider:",
        "lbl_api_key": "API Key:",
        "lbl_model": "Model (Gemini):",
        "lbl_sys_prompt": "System Prompt:",
        
        "lbl_whisper_model": "Whisper Model:",
        "lbl_vad": "VAD Filter (Ignore silence):",
        "lbl_beam": "Precision (Beam Size):",
        "lbl_temp": "Temperature:",
        
        "lbl_app_select": "Select an application",
        "lbl_vision": "Enable Vision (Screen analysis)",
        "lbl_app_class": "Window Class Name (e.g. google-chrome):",
        "btn_add_rule": "Add / Update Rule",
        "btn_delete": "Delete",
        
        "msg_saved_title": "Saved",
        "msg_saved_general": "General settings saved successfully.",
        "msg_saved_ai": "AI settings saved successfully.",
        "msg_saved_adv": "Advanced settings saved successfully.",
        "msg_rule_added": "Rule for {} saved successfully.",
        "msg_rule_deleted": "Rule for {} deleted.",
        "msg_select_app": "Select an application"
    },
    "es": {
        "ready": "Listo ({})",
        "recording": "Grabando...",
        "paused": "Pausado",
        "processing": "Procesando...",
        "ai_enabled": "IA: Activada",
        "ai_disabled": "IA: Desactivada",
        "autosend_enabled": "Auto-Enviar: Activado",
        "autosend_disabled": "Auto-Enviar: Desactivado",
        "autopause_enabled": "Auto-Pausa Medios: Activada",
        "autopause_disabled": "Auto-Pausa Medios: Desactivada",
        "bubble_visible": "Burbuja: Visible",
        "bubble_hidden": "Burbuja: Oculta",
        "error": "Error: {}",
        "copied": "Copiado al portapapeles",
        "quit": "Salir",
        "settings": "Configuración",

        "close": "Cerrar",
        "copy_clipboard": "Copiar al portapapeles",
        "insert_text": "Insertar",
        "loading_model": "Cargando modelo...",
        "loading_model_param": "Cargando {size}...",
        "whisper_model": "Modelo Whisper",
        "auto_send": "Enviar Automático (Enter)",
        "ai_cleanup": "Limpieza con IA",
        "opendeck_installed": "✅ OpenDeck: Instalado",
        "opendeck_not_installed": "❌ OpenDeck: No Instalado",
        "error_opening_config": "No se pudo abrir la configuración.",
        "opendeck": "OpenDeck",
        "opendeck_installed_success": "Plugin de OpenDeck instalado exitosamente.",
        "error_plugin_not_found": "No se encontró el plugin fuente.",
        "error_whisper": "Error de Whisper",
        "error_loading_model": "Error cargando modelo",

        "settings_title": "Configuración - OpenDictate",
        "tab_general": "General",
        "tab_apps": "Aplicaciones",
        "tab_ai": "IA y Modelos",
        "tab_advanced": "Avanzado",

        "ui_language": "Idioma de la interfaz:",
        "transcription_language": "Idioma de transcripción:",
        "transcription_auto": "Automático",

        "lbl_autosend": "Enviar Automático (Enter):",
        "lbl_ai_enabled": "Limpieza con IA:",
        "lbl_hide_bubble": "Ocultar Burbuja (Modo OpenDeck):",
        "lbl_auto_pause": "Pausar multimedia al grabar:",
        "lbl_autostart": "Inicio automático con el sistema:",

        "btn_save_general": "Guardar Configuración General",
        "btn_save_ai": "Guardar Configuración de IA",
        "btn_save_adv": "Guardar Configuración Avanzada",

        "lbl_provider": "Proveedor API:",
        "lbl_api_key": "API Key:",
        "lbl_model": "Modelo (Gemini):",
        "lbl_sys_prompt": "Prompt del Sistema:",

        "lbl_whisper_model": "Modelo de Whisper:",
        "lbl_vad": "Filtro VAD (Ignorar silencios):",
        "lbl_beam": "Precisión (Beam Size):",
        "lbl_temp": "Temperatura:",

        "lbl_app_select": "Selecciona una aplicación",
        "lbl_vision": "Activar Visión (Analizar pantalla)",
        "lbl_app_class": "Nombre de la Ventana (ej. google-chrome):",
        "btn_add_rule": "Añadir / Actualizar Regla",
        "btn_delete": "Eliminar",

        "msg_saved_title": "Guardado",
        "msg_saved_general": "Configuración general guardada exitosamente.",
        "msg_saved_ai": "Configuración de IA guardada exitosamente.",
        "msg_saved_adv": "Configuración avanzada guardada exitosamente.",
        "msg_rule_added": "Regla para {} guardada exitosamente.",
        "msg_rule_deleted": "Regla para {} eliminada.",
        "msg_select_app": "Selecciona una aplicación"
    }
}

class Translator:
    def __init__(self, config_path):
        self.lang = DEFAULT_LANG
        if os.path.exists(config_path):
            try:
                with open(config_path, "r") as f:
                    config = json.load(f)
                    self.lang = config.get("ui_language", DEFAULT_LANG)
            except:
                pass
        
        if self.lang not in TRANSLATIONS:
            self.lang = DEFAULT_LANG

    def t(self, key, *args):
        text = TRANSLATIONS[self.lang].get(key, TRANSLATIONS[DEFAULT_LANG].get(key, key))
        if args:
            # Check if text expects keyword formatting
            if '{size}' in text and 'size' in args[0] if isinstance(args[0], dict) else False:
                return text.format(**args[0])
            return text.format(*args)
        return text

def get_translator(config_path):
    return Translator(config_path)
