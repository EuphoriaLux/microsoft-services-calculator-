import React, { createContext, useState, useEffect } from 'react';
import services, { getAllServices } from '../data/services';
import currencies, { getCurrencyByCode, formatAmountForCurrency } from '../data/currencies';

export const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const [serviceItems, setServiceItems] = useState([]);
  const [filters, setFilters] = useState({
    phase: 'all',
    serviceType: 'all',
    tech: 'all',
  });
  
  const [currentLang, setCurrentLang] = useState('en');
  const [currentCurrency, setCurrentCurrency] = useState(getCurrencyByCode('usd'));
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  
  const [quoteItems, setQuoteItems] = useState([]);

  useEffect(() => {
    // Initialize service items with quantity property
    const servicesWithQuantity = getAllServices().map(service => ({
      ...service,
      quantity: 0
    }));
    
    setServiceItems(servicesWithQuantity);
    
    // Initialize available currencies
    setAvailableCurrencies(currencies);
  }, []);

  // Change the current currency
  const changeCurrency = (currencyCode) => {
    const newCurrency = getCurrencyByCode(currencyCode);
    if (newCurrency) {
      setCurrentCurrency(newCurrency);
    }
  };

  // Update quantity for a service
  const updateQuantity = (id, newQuantity) => {
    setServiceItems(
      serviceItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, newQuantity) } 
          : item
      )
    );
  };

  // Filter services based on current filters
  const getFilteredServices = () => {
    return serviceItems.filter(item => {
      if (filters.phase !== 'all' && item.phase !== filters.phase) {
        return false;
      }
      if (filters.serviceType !== 'all' && item.serviceType !== filters.serviceType) {
        return false;
      }
      if (filters.tech !== 'all' && item.tech !== filters.tech) {
        return false;
      }
      return true;
    });
  };

  // Calculate total price in current currency
  const calculateTotal = () => {
    const totalUSD = serviceItems.reduce((total, item) => {
      return total + (item.quantity * item.price);
    }, 0);
    
    return totalUSD * currentCurrency.rate;
  };

  // Format currency using the current currency settings
  const formatCurrency = (amount) => {
    return formatAmountForCurrency(amount, currentCurrency);
  };

  // Generate quote
  const generateQuote = () => {
    const selectedItems = serviceItems.filter(item => item.quantity > 0);
    setQuoteItems(selectedItems.map(item => ({
      ...item,
      totalPrice: item.quantity * item.price
    })));
  };

  // Update quote item quantity
  const updateQuoteItem = (id, quantity) => {
    setQuoteItems(
      quoteItems.map(item => 
        item.id === id 
          ? { ...item, quantity, totalPrice: quantity * item.price } 
          : item
      )
    );
  };

  // Remove item from quote
  const removeQuoteItem = (id) => {
    setQuoteItems(quoteItems.filter(item => item.id !== id));
  };

  // Calculate quote total in current currency
  const calculateQuoteTotal = () => {
    const totalUSD = quoteItems.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
    
    return totalUSD * currentCurrency.rate;
  };

  return (
    <CalculatorContext.Provider
      value={{
        serviceItems,
        filters,
        setFilters,
        updateQuantity,
        getFilteredServices,
        calculateTotal,
        formatCurrency,
        currentLang,
        setCurrentLang,
        currentCurrency,
        changeCurrency,
        availableCurrencies,
        generateQuote,
        quoteItems,
        updateQuoteItem,
        removeQuoteItem,
        calculateQuoteTotal
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};