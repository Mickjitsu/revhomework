import { MODE, URLS } from './constants.js';
import { RevolutPaymentsLoader } from './paymentsLoader.js';
import { getVersionedUrl, loadModule } from './utils.js';
import { RevolutUpsellLoader } from './upsellLoader.js';
import { RevolutPaymentsVersionLoader } from './versionLoader.js';
var loaded = null;
/**
 * Load [`RevolutCheckout.js`](https://developer.revolut.com/docs/revolut-checkout-js/#revolutcheckout)
 * and create [`Instance`](https://developer.revolut.com/docs/revolut-checkout-js/#instance) for the order `token`.
 *
 * @param token `public_id`  from [create payment order](https://developer.revolut.com/api-reference/merchant/#operation/createOrder) API request
 * @param mode [API](https://developer.revolut.com/docs/revolut-checkout-js/#revolutcheckout-parameters) environment, defaults to `'prod'`
 *
 * @see [`RevolutCheckout.js` reference](https://developer.revolut.com/docs/revolut-checkout-js)
 *
 * @example
 * ```js
 * RevolutCheckout('TOKEN_XXX', 'prod').then(function(instance) {
 *   // Work with instance
 * });
 * ```
 */
export function RevolutCheckoutLoader(token, mode) {
    if (mode === void 0) { mode = RevolutCheckoutLoader.mode; }
    if (loaded) {
        return Promise.resolve(loaded(token));
    }
    return RevolutPaymentsVersionLoader(mode).then(function (version) {
        return loadRevolutCheckout(version, token, mode);
    });
}
function loadRevolutCheckout(version, token, mode) {
    return loadModule({
        src: getVersionedUrl(URLS[mode].embed, version),
        id: 'revolut-checkout',
        name: 'RevolutCheckout',
    }).then(function (scriptElement) {
        if (typeof RevolutCheckout === 'function') {
            loaded = RevolutCheckout;
            delete window.RevolutCheckout;
            return loaded(token);
        }
        else {
            document.head.removeChild(scriptElement);
            throw new Error("'RevolutCheckout' failed to load: RevolutCheckout is not a function");
        }
    });
}
RevolutCheckoutLoader.mode = MODE.PRODUCTION;
RevolutCheckoutLoader.payments = function (_a) {
    var locale = _a.locale, publicToken = _a.publicToken, _b = _a.mode, mode = _b === void 0 ? RevolutCheckoutLoader.mode : _b;
    return RevolutPaymentsLoader(publicToken, mode, locale);
};
RevolutCheckoutLoader.upsell = function (_a) {
    var locale = _a.locale, publicToken = _a.publicToken, _b = _a.mode, mode = _b === void 0 ? RevolutCheckoutLoader.mode : _b;
    return RevolutUpsellLoader(publicToken, mode, locale);
};
