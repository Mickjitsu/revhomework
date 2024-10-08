var _a;
export var LOCALES = [
    'en',
    'en-US',
    'nl',
    'fr',
    'de',
    'cs',
    'it',
    'lt',
    'pl',
    'pt',
    'es',
    'hu',
    'sk',
    'ja',
    'sv',
    'bg',
    'ro',
    'el',
    'hr',
];
export var MODE = {
    PRODUCTION: 'prod',
    DEVELOPMENT: 'dev',
    SANDBOX: 'sandbox',
};
export var URLS = (_a = {},
    _a[MODE.SANDBOX] = {
        embed: 'https://sandbox-merchant.revolut.com/embed.js',
        version: 'https://sandbox-merchant.revolut.com/version.js',
        upsell: 'https://sandbox-merchant.revolut.com/upsell/embed.js',
    },
    _a[MODE.PRODUCTION] = {
        embed: 'https://merchant.revolut.com/embed.js',
        version: 'https://merchant.revolut.com/version.js',
        upsell: 'https://merchant.revolut.com/upsell/embed.js',
    },
    _a[MODE.DEVELOPMENT] = {
        embed: 'https://merchant.revolut.codes/embed.js',
        version: 'https://merchant.revolut.codes/version.js',
        upsell: 'https://merchant.revolut.codes/upsell/embed.js',
    },
    _a);
export var REVOLUT_PAY_ORDER_ID_URL_PARAMETER = '_rp_oid';
export var REVOLUT_PAY_SUCCESS_REDIRECT_URL_PARAMETER = '_rp_s';
export var REVOLUT_PAY_FAILURE_REDIRECT_URL_PARAMETER = '_rp_fr';
