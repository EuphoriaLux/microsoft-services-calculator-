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
  const [serviceTiers, setServiceTiers] = useState({});

  useEffect(() => {
    // Initialize service items with quantity property
    const servicesWithQuantity = getAllServices().map(service => ({
      ...service,
      quantity: 0
    }));
    
    // Initialize tiers for services that have them
    const initialTiers = {};
    servicesWithQuantity.forEach(service => {
      if (service.hasTiers) {
        initialTiers[service.id] = service.defaultTier;
      }
    });
    
    setServiceItems(servicesWithQuantity);
    setServiceTiers(initialTiers);
    
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
  
  // Update tier for a service
  const updateTier = (serviceId, tierId) => {
    setServiceTiers(prev => ({
      ...prev,
      [serviceId]: tierId
    }));
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
      if (item.quantity === 0) return total;
      
      // Get price based on selected tier or default price
      let itemPrice = item.price;
      if (item.hasTiers && serviceTiers[item.id]) {
        const tier = item.tiers.find(t => t.id === serviceTiers[item.id]);
        if (tier) itemPrice = tier.price;
      }
      
      return total + (item.quantity * itemPrice);
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
    setQuoteItems(selectedItems.map(item => {
      // Get price based on selected tier or default price
      let itemPrice = item.price;
      let tierName = '';
      let tierObject = null;
      
      if (item.hasTiers && serviceTiers[item.id]) {
        const tier = item.tiers.find(t => t.id === serviceTiers[item.id]);
        if (tier) {
          itemPrice = tier.price;
          tierName = tier.name;
          tierObject = tier;
        }
      }
      
      return {
        ...item,
        price: itemPrice,
        tierName,
        tierObject,
        selectedTier: serviceTiers[item.id] || null,
        totalPrice: item.quantity * itemPrice
      };
    }));
  };

  // Update quote item quantity
  const updateQuoteItem = (id, quantity, tierId = null) => {
    setQuoteItems(
      quoteItems.map(item => {
        if (item.id !== id) return item;
        
        // Calculate new price if tier changed
        let itemPrice = item.price;
        let tierName = item.tierName;
        let tierObject = item.tierObject;
        
        if (item.hasTiers && tierId) {
          const tier = item.tiers.find(t => t.id === tierId);
          if (tier) {
            itemPrice = tier.price;
            tierName = tier.name;
            tierObject = tier;
          }
          // Update the serviceTiers state as well
          setServiceTiers(prev => ({
            ...prev,
            [id]: tierId
          }));
        }
        
        return {
          ...item,
          quantity,
          price: itemPrice,
          tierName,
          tierObject,
          selectedTier: tierId || item.selectedTier,
          totalPrice: quantity * itemPrice
        };
      })
    );
  };

  // Remove item from quote
  const removeQuoteItem = (id) => {
    setQuoteItems(quoteItems.filter(item => item.id !== id));
    
    // Also update the quantity of the item in serviceItems to 0
    setServiceItems(
      serviceItems.map(item => 
        item.id === id 
          ? { ...item, quantity: 0 } 
          : item
      )
    );
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
        calculateQuoteTotal,
        serviceTiers,
        updateTier
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};