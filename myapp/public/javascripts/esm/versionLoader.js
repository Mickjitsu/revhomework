import { MODE, URLS } from './constants.js';
import { getVersionedUrl, loadModule } from './utils.js';
var loadedVersion = null;
export function RevolutPaymentsVersionLoader(mode) {
    if (mode === void 0) { mode = RevolutPaymentsVersionLoader.mode; }
    if (typeof loadedVersion === 'string') {
        return Promise.resolve(loadedVersion);
    }
    return loadModule({
        src: getVersionedUrl(URLS[mode].version, "" + Date.now()),
        id: 'revolut-pay-version',
        name: 'RevolutPayVersion',
    })
        .then(function () {
        loadedVersion =
            '__REV_PAY_VERSION__' in window &&
                typeof __REV_PAY_VERSION__ === 'string'
                ? __REV_PAY_VERSION__
                : '';
        delete window.__REV_PAY_VERSION__;
        return loadedVersion;
    })
        .catch(function () {
        loadedVersion = '';
        return loadedVersion;
    });
}
RevolutPaymentsVersionLoader.mode = MODE.PRODUCTION;
