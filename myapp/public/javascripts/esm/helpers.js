import { REVOLUT_PAY_ORDER_ID_URL_PARAMETER, REVOLUT_PAY_SUCCESS_REDIRECT_URL_PARAMETER, REVOLUT_PAY_FAILURE_REDIRECT_URL_PARAMETER, } from './constants.js';
var getSearchParamsByName = function (name) {
    return new URLSearchParams(window.location.search).get(name);
};
/**
 * Retrieve the revolut pay order ID URL parameter upon redirect to your merchant site
 */
export var getRevolutPayOrderIdURLParam = function () {
    return getSearchParamsByName(REVOLUT_PAY_ORDER_ID_URL_PARAMETER);
};
/**
 * Retrieve the revolut pay success URL parameter upon redirect to your merchant site
 */
export var getRevolutPaySuccessURLParam = function () {
    return getSearchParamsByName(REVOLUT_PAY_SUCCESS_REDIRECT_URL_PARAMETER);
};
/**
 * Retrieve the revolut pay failure URL parameter upon redirect to your merchant site
 */
export var getRevolutPayFailureURLParam = function () {
    return getSearchParamsByName(REVOLUT_PAY_FAILURE_REDIRECT_URL_PARAMETER);
};
