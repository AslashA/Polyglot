var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { format } from 'url';
import 'whatwg-fetch';
export function translate(text, targetLanguage) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = format({
            query: {
                client: 'gtx',
                sl: 'auto',
                tl: targetLanguage,
                dt: 't',
                q: text,
            },
        });
        const endpoint = `http://translate.googleapis.com/translate_a/single${query}`;
        try {
            const response = yield fetch(endpoint);
            const body = yield response.text();
            const data = JSON.parse(body.replace(/,,/g, ',null,').replace(/,,/g, ',null,'));
            const translatedText = data[0]
                .map((sentence) => sentence[0])
                .join('<br/>');
            return translatedText;
        }
        catch (err) {
            Promise.reject(err);
        }
    });
}
