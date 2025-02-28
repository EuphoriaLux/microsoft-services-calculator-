/**
 * Currencies data for Microsoft Services Calculator
 * This file contains all currency options used in the application
 */

const currencies = [
    {
      code: 'usd',
      name: 'US Dollar',
      symbol: '$',
      rate: 1, // Base currency
      locale: 'en-US'
    },
    {
      code: 'eur',
      name: 'Euro',
      symbol: '€',
      rate: 0.91, // 1 USD = 0.91 EUR (example conversion rate)
      locale: 'de-DE'
    },
    {
      code: 'gbp',
      name: 'British Pound',
      symbol: '£',
      rate: 0.78, // 1 USD = 0.78 GBP (example conversion rate)
      locale: 'en-GB'
    }
  ];
  
  /**
   * Get all available currencies
   * @returns {Array} All currency objects
   */
  export const getAllCurrencies = () => {
    return currencies;
  };
  
  /**
   * Get a specific currency by code
   * @param {string} code - The currency code to find
   * @returns {Object|null} The currency object or null if not found
   */
  export const getCurrencyByCode = (code) => {
    return currencies.find(currency => currency.code === code) || null;
  };
  
  /**
   * Convert an amount from USD to the specified currency
   * @param {number} amount - The amount in USD
   * @param {string} currencyCode - The target currency code
   * @returns {number} The converted amount
   */
  export const convertCurrency = (amount, currencyCode) => {
    const currency = getCurrencyByCode(currencyCode);
    if (!currency) return amount;
    return amount * currency.rate;
  };
  
  /**
   * Format an amount according to the specified currency
   * @param {number} amount - The amount to format
   * @param {Object} currency - The currency object
   * @returns {string} The formatted amount with currency symbol
   */
  export const formatAmountForCurrency = (amount, currency) => {
    return amount.toLocaleString(currency.locale, {
      style: 'currency',
      currency: currency.code.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  export default currencies;