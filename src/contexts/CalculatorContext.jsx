import React, { createContext, useState, useEffect } from 'react';
import services, { getAllServices, calculateSubscriptionPrice } from '../data/services';
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
  const [serviceSubscriptions, setServiceSubscriptions] = useState({});

  useEffect(() => {
    // Initialize service items with quantity property
    const servicesWithQuantity = getAllServices().map(service => ({
      ...service,
      quantity: 0
    }));
    
    // Initialize tiers for services that have them
    const initialTiers = {};
    const initialSubscriptions = {};
    
    servicesWithQuantity.forEach(service => {
      if (service.hasTiers) {
        initialTiers[service.id] = service.defaultTier;
      }
      
      if (service.hasSubscriptionTiers) {
        initialSubscriptions[service.id] = service.defaultSubscription;
      }
    });
    
    setServiceItems(servicesWithQuantity);
    setServiceTiers(initialTiers);
    setServiceSubscriptions(initialSubscriptions);
    
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
  
  // Update subscription period for a service
  const updateSubscription = (serviceId, subscriptionId) => {
    setServiceSubscriptions(prev => ({
      ...prev,
      [serviceId]: subscriptionId
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

  // Calculate price for a specific service with tiers and subscription
  const calculateServicePrice = (service) => {
    if (service.quantity === 0) return 0;
    
    // Get tier if applicable
    const tierId = service.hasTiers ? serviceTiers[service.id] : null;
    
    // Get subscription if applicable
    const subscriptionId = service.hasSubscriptionTiers ? serviceSubscriptions[service.id] : null;
    
    // Calculate price
    let price = service.price;
    
    // If service has tiers but no subscription tiers
    if (service.hasTiers && !service.hasSubscriptionTiers && tierId) {
      const tier = service.tiers.find(t => t.id === tierId);
      if (tier) price = tier.price;
    }
    // If service has subscription tiers but no regular tiers
    else if (!service.hasTiers && service.hasSubscriptionTiers && subscriptionId) {
      const subscription = service.subscriptionTiers.find(s => s.id === subscriptionId);
      if (subscription) price = subscription.price;
    }
    // If service has both tiers and subscription tiers
    else if (service.hasTiers && service.hasSubscriptionTiers && tierId && subscriptionId) {
      price = calculateSubscriptionPrice(service, tierId, subscriptionId);
    }
    
    return price * service.quantity;
  };

  // Calculate total price in current currency
  const calculateTotal = () => {
    const totalUSD = serviceItems.reduce((total, item) => {
      return total + calculateServicePrice(item);
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
      // Get the appropriate tier and subscription
      const tierId = item.hasTiers ? serviceTiers[item.id] : null;
      const subscriptionId = item.hasSubscriptionTiers ? serviceSubscriptions[item.id] : null;
      
      // Get tier information
      let tierName = '';
      let tierObject = null;
      if (item.hasTiers && tierId) {
        const tier = item.tiers.find(t => t.id === tierId);
        if (tier) {
          tierName = tier.name;
          tierObject = tier;
        }
      }
      
      // Get subscription information
      let subscriptionName = '';
      let subscriptionObject = null;
      if (item.hasSubscriptionTiers && subscriptionId) {
        const subscription = item.subscriptionTiers.find(s => s.id === subscriptionId);
        if (subscription) {
          subscriptionName = subscription.name;
          subscriptionObject = subscription;
        }
      }
      
      // Calculate total price for the item
      const itemPrice = calculateServicePrice(item) / item.quantity;
      
      return {
        ...item,
        price: itemPrice,
        tierName,
        tierObject,
        subscriptionName,
        subscriptionObject,
        selectedTier: tierId,
        selectedSubscription: subscriptionId,
        totalPrice: itemPrice * item.quantity
      };
    }));
  };

  // Update quote item
  const updateQuoteItem = (id, quantity, tierId = null, subscriptionId = null) => {
    setQuoteItems(
      quoteItems.map(item => {
        if (item.id !== id) return item;
        
        // Handle tier changes if needed
        let newTierId = tierId !== null ? tierId : item.selectedTier;
        if (newTierId !== item.selectedTier && item.hasTiers) {
          setServiceTiers(prev => ({
            ...prev,
            [id]: newTierId
          }));
        }
        
        // Handle subscription changes if needed
        let newSubscriptionId = subscriptionId !== null ? subscriptionId : item.selectedSubscription;
        if (newSubscriptionId !== item.selectedSubscription && item.hasSubscriptionTiers) {
          setServiceSubscriptions(prev => ({
            ...prev,
            [id]: newSubscriptionId
          }));
        }
        
        // Find the matching service to get up-to-date price info
        const service = serviceItems.find(s => s.id === id);
        if (!service) return item;
        
        // Create updated item with new quantity and tiers
        const updatedItem = {
          ...service,
          quantity
        };
        
        // Calculate the new price
        const newPrice = calculateServicePrice(updatedItem) / quantity;
        
        // Get tier information
        let tierName = '';
        let tierObject = null;
        if (item.hasTiers && newTierId) {
          const tier = item.tiers.find(t => t.id === newTierId);
          if (tier) {
            tierName = tier.name;
            tierObject = tier;
          }
        }
        
        // Get subscription information
        let subscriptionName = '';
        let subscriptionObject = null;
        if (item.hasSubscriptionTiers && newSubscriptionId) {
          const subscription = item.subscriptionTiers.find(s => s.id === newSubscriptionId);
          if (subscription) {
            subscriptionName = subscription.name;
            subscriptionObject = subscription;
          }
        }
        
        return {
          ...item,
          quantity,
          price: newPrice,
          tierName,
          tierObject,
          subscriptionName,
          subscriptionObject,
          selectedTier: newTierId,
          selectedSubscription: newSubscriptionId,
          totalPrice: newPrice * quantity
        };
      })
    );
    
    // Also update the service items
    setServiceItems(
      serviceItems.map(item => 
        item.id === id 
          ? { ...item, quantity } 
          : item
      )
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
        updateTier,
        serviceSubscriptions,
        updateSubscription,
        calculateServicePrice
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};