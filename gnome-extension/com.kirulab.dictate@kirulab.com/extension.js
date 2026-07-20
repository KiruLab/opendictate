import St from 'gi://St';
import Clutter from 'gi://Clutter';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import GObject from 'gi://GObject';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

const STATE_FILE = '/tmp/dictate_state.json';
const SOCKET_PATH = '/tmp/dictate_daemon.socket';

const OpenDictateIndicator = GObject.registerClass(
class OpenDictateIndicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, 'OpenDictate');
        
        this._box = new St.BoxLayout({ style_class: 'opendictate-box' });
        
        // Microphone Icon (Main Button)
        this._mainButton = new St.Button({
            child: new St.Icon({
                icon_name: 'audio-input-microphone-symbolic',
                style_class: 'system-status-icon',
            }),
            style_class: 'panel-button',
            reactive: true,
            can_focus: true,
            track_hover: true,
        });
        this._mainButton.connect('button-press-event', (actor, event) => {
            if (event.get_button() === 1) { // Left click
                this._sendCommand('record');
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });
        
        // Time Label
        this._timeLabel = new St.Label({
            text: '00:00',
            y_align: Clutter.ActorAlign.CENTER,
            style_class: 'opendictate-time-label'
        });
        
        // Pause Button
        this._pauseButton = new St.Button({
            child: new St.Icon({
                icon_name: 'media-playback-pause-symbolic',
                style_class: 'system-status-icon',
            }),
            style_class: 'opendictate-button',
            y_align: Clutter.ActorAlign.CENTER,
            reactive: true,
            can_focus: true,
            track_hover: true,
        });
        this._pauseButton.connect('button-press-event', (actor, event) => {
            if (event.get_button() === 1) {
                this._sendCommand('pause');
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });
        
        // Cancel Button
        this._cancelButton = new St.Button({
            child: new St.Icon({
                icon_name: 'media-playback-stop-symbolic',
                style_class: 'system-status-icon',
            }),
            style_class: 'opendictate-button',
            y_align: Clutter.ActorAlign.CENTER,
            reactive: true,
            can_focus: true,
            track_hover: true,
        });
        this._cancelButton.connect('button-press-event', (actor, event) => {
            if (event.get_button() === 1) {
                this._sendCommand('cancel');
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });
        
        // Add children
        this._box.add_child(this._mainButton);
        this._box.add_child(this._timeLabel);
        this._box.add_child(this._pauseButton);
        this._box.add_child(this._cancelButton);
        
        this.add_child(this._box);
        
        this._timeLabel.hide();
        this._pauseButton.hide();
        this._cancelButton.hide();
        
        this._stateData = null;
        this._timerId = null;
        
        this._monitorStateFile();
    }
    
    _sendCommand(cmd) {
        try {
            let client = new Gio.SocketClient();
            let address = Gio.UnixSocketAddress.new(SOCKET_PATH);
            client.connect_async(address, null, (client, res) => {
                try {
                    let connection = client.connect_finish(res);
                    let output = connection.get_output_stream();
                    output.write_bytes_async(new GLib.Bytes(cmd), GLib.PRIORITY_DEFAULT, null, (stream, res2) => {
                        stream.write_bytes_finish(res2);
                        connection.close(null);
                    });
                } catch (e) {
                    console.error(`OpenDictate: Socket error sending ${cmd}: ${e.message}`);
                }
            });
        } catch (e) {
            console.error(`OpenDictate: Socket setup error: ${e.message}`);
        }
    }
    
    _updateUI(stateData) {
        this._stateData = stateData;
        let state = stateData.state || "IDLE";
        
        let icon = this._mainButton.get_child();
        
        if (state === "RECORDING") {
            icon.icon_name = 'media-record-symbolic';
            icon.add_style_class_name('recording');
            icon.remove_style_class_name('paused');
            
            this._timeLabel.show();
            this._pauseButton.show();
            this._pauseButton.get_child().icon_name = 'media-playback-pause-symbolic';
            this._cancelButton.show();
            this._startTimer();
            
        } else if (state === "PAUSED") {
            icon.icon_name = 'media-playback-pause-symbolic';
            icon.remove_style_class_name('recording');
            icon.add_style_class_name('paused');
            
            this._timeLabel.show();
            this._pauseButton.show();
            this._pauseButton.get_child().icon_name = 'media-record-symbolic'; // To resume
            this._cancelButton.show();
            this._stopTimer();
            this._updateTimeDisplay();
            
        } else if (state === "LOADING" || state === "PREVIEW" || state === "CLEANING" || state === "PROCESSING") {
            icon.icon_name = 'view-refresh-symbolic';
            icon.remove_style_class_name('recording');
            icon.remove_style_class_name('paused');
            
            this._timeLabel.hide();
            this._pauseButton.hide();
            this._cancelButton.hide();
            this._stopTimer();
        } else {
            icon.icon_name = 'audio-input-microphone-symbolic';
            icon.remove_style_class_name('recording');
            icon.remove_style_class_name('paused');
            
            this._timeLabel.hide();
            this._pauseButton.hide();
            this._cancelButton.hide();
            this._stopTimer();
        }
    }
    
    _updateTimeDisplay() {
        if (!this._stateData || !this._stateData.start_time) return;
        
        let elapsed = 0;
        let nowSecs = GLib.get_real_time() / 1000000;
        
        if (this._stateData.state === "RECORDING") {
            elapsed = nowSecs - this._stateData.start_time - (this._stateData.total_paused_time || 0);
        } else if (this._stateData.state === "PAUSED") {
            elapsed = (this._stateData.pause_start_time || nowSecs) - this._stateData.start_time - (this._stateData.total_paused_time || 0);
        }
        
        if (elapsed < 0) elapsed = 0;
        
        let mins = Math.floor(elapsed / 60);
        let secs = Math.floor(elapsed % 60);
        let timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        this._timeLabel.set_text(timeStr);
    }
    
    _startTimer() {
        if (!this._timerId) {
            this._updateTimeDisplay();
            this._timerId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 500, () => {
                this._updateTimeDisplay();
                return GLib.SOURCE_CONTINUE;
            });
        }
    }
    
    _stopTimer() {
        if (this._timerId) {
            GLib.Source.remove(this._timerId);
            this._timerId = null;
        }
    }
    
    _readStateFile() {
        let file = Gio.File.new_for_path(STATE_FILE);
        if (!file.query_exists(null)) return;
        
        try {
            let [, contents] = file.load_contents(null);
            let stateData = JSON.parse(new TextDecoder().decode(contents));
            this._updateUI(stateData);
        } catch (e) {
            console.error(`OpenDictate: Error reading state file: ${e.message}`);
        }
    }
    
    _monitorStateFile() {
        let file = Gio.File.new_for_path(STATE_FILE);
        try {
            this._monitor = file.monitor_file(Gio.FileMonitorFlags.NONE, null);
            this._monitor.connect('changed', (monitor, file, otherFile, eventType) => {
                if (eventType === Gio.FileMonitorEvent.CHANGES_DONE_HINT || eventType === Gio.FileMonitorEvent.CREATED) {
                    this._readStateFile();
                }
            });
        } catch (e) {
            console.error(`OpenDictate: Error monitoring state file: ${e.message}`);
        }
        this._readStateFile();
    }
    
    destroy() {
        this._stopTimer();
        if (this._monitor) {
            this._monitor.cancel();
            this._monitor = null;
        }
        super.destroy();
    }
});

export default class OpenDictateExtension extends Extension {
    enable() {
        this._indicator = new OpenDictateIndicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator, 1, 'center');
    }

    disable() {
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
    }
}
