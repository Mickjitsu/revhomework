import { MODE, URLS } from './constants.js';
import { getVersionedUrl, loadModule } from './utils.js';
import { RevolutPaymentsVersionLoader } from './versionLoader.js';
var loadedPaymentInstance = null;
export function RevolutPaymentsLoader(token, mode, locale) {
    if (mode === void 0) { mode = RevolutPaymentsLoader.mode; }
    if (loadedPaymentInstance) {
        var instance = loadedPaymentInstance({ publicToken: token, locale: locale });
        return Promise.resolve(instance);
    }
    return RevolutPaymentsVersionLoader(mode).then(function (version) {
        return loadRevolutPayments(version, token, mode, locale);
    });
}
function loadRevolutPayments(version, token, mode, locale) {
    return loadModule({
        src: getVersionedUrl(URLS[mode].embed, version),
        id: 'revolut-payments',
        name: 'RevolutPayments',
    }).then(function (scriptElement) {
        if (typeof RevolutCheckout === 'function') {
            loadedPaymentInstance = RevolutCheckout.payments;
            delete window.RevolutCheckout;
            return loadedPaymentInstance({ publicToken: token, locale: locale });
        }
        else {
            document.head.removeChild(scriptElement);
            throw new Error("'RevolutPayments' failed to load: RevolutCheckout is not a function");
        }
    });
}
RevolutPaymentsLoader.mode = MODE.PRODUCTION;
