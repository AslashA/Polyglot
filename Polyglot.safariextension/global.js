var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { translate } from './api';
const settingsKeys = [
    'keyValue',
    'useCtrlKey',
    'useMetaKey',
    'useShiftKey',
    'useAltKey',
    'targetLanguage',
];
let settings = {};
settingsKeys.forEach(key => {
    settings[key] = safari.extension.settings[key];
});
safari.application.addEventListener('command', performCommand, false);
safari.application.addEventListener('message', handleMessage, false);
safari.extension.settings.addEventListener('change', settingsChanged, false);
function performCommand(event) {
    const { command } = event;
    if (command === 'translateSelectedText') {
        safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('getSelectedText');
    }
}
function handleMessage(msg) {
    const { name } = msg;
    if (name === 'finishedGetSelectedText') {
        handleFinishedGetSelectedText(msg);
    }
    else if (name === 'getSettings') {
        handleGetSettings(msg);
    }
}
function handleFinishedGetSelectedText(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        if (msg.message === '') {
            return;
        }
        const target = msg.target;
        target.page.dispatchMessage('showPanel', '<div class="polyglot__loader">Loading</div>');
        if (settings.targetLanguage === '') {
            target.page.dispatchMessage('updatePanel', 'Set target language');
            return;
        }
        try {
            const translatedText = yield translate(msg.message, settings.targetLanguage);
            target.page.dispatchMessage('updatePanel', translatedText);
        }
        catch (err) {
            target.page.dispatchMessage('updatePanel', err);
        }
    });
}
function handleGetSettings(msg) {
    const target = msg.target;
    target.page.dispatchMessage('settingsReceived', settings);
}
function settingsChanged(event) {
    settings[event.key] = event.newValue;
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('settingsReceived', settings);
}
