import { LOCALES } from './constants.js';
export function isValidationError(error) {
    return error != null && error.name === 'Validation';
}
export function isRevolutCheckoutError(error) {
    return error != null && error.name === 'RevolutCheckout';
}
export function isValidLocale(locale) {
    return locale && LOCALES.some(function (value) { return value === locale; });
}
