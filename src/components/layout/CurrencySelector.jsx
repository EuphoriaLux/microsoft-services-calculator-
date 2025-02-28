import React, { useContext } from 'react';
import { CalculatorContext } from '../../contexts/CalculatorContext';

const CurrencySelector = () => {
  const { currentCurrency, changeCurrency, availableCurrencies } = useContext(CalculatorContext);

  return (
    <div className="flex justify-center gap-2 mt-4">
      {availableCurrencies.map((currency) => (
        <button
          key={currency.code}
          className={`px-4 py-2 border border-ms-blue rounded-ms ${
            currentCurrency.code === currency.code
              ? 'bg-ms-blue text-white'
              : 'bg-white text-ms-blue hover:bg-blue-50'
          }`}
          onClick={() => changeCurrency(currency.code)}
        >
          {currency.symbol} {currency.name}
        </button>
      ))}
    </div>
  );
};

export default CurrencySelector;