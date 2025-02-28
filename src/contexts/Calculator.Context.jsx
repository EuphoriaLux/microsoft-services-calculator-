import React, { createContext, useState, useEffect } from 'react';

export const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const [serviceItems, setServiceItems] = useState([]);
  const [filters, setFilters] = useState({
    serviceType: 'all',
    tech: 'all',
  });
  
  const [currentLang, setCurrentLang] = useState('en');
  const [currentCurrency, setCurrentCurrency] = useState({
    code: 'usd',
    symbol: '$',
    rate: 1
  });
  
  const [quoteItems, setQuoteItems] = useState([]);

  useEffect(() => {
    // Initialize service items
    setServiceItems([
      // EDUCATE PHASE - WORKSHOPS
      {
        id: 'azure-workshop',
        name: 'Azure Cloud Workshop (1 day)',
        phase: 'educate',
        tech: 'azure',
        serviceType: 'workshop',
        price: 1200,
        quantity: 0
      },
      {
        id: 'm365-workshop',
        name: 'Microsoft 365 Workshop (1 day)',
        phase: 'educate',
        tech: 'm365',
        serviceType: 'workshop',
        price: 1000,
        quantity: 0
      },
      {
        id: 'power-workshop',
        name: 'Power Platform Workshop (2 days)',
        phase: 'educate',
        tech: 'power',
        serviceType: 'workshop',
        price: 1800,
        quantity: 0
      },
      {
        id: 'security-workshop',
        name: 'Security Best Practices Workshop',
        phase: 'educate',
        tech: 'security',
        serviceType: 'workshop',
        price: 1500,
        quantity: 0
      },
      
      // EDUCATE PHASE - ADOPTION
      {
        id: 'teams-adoption',
        name: 'Teams Adoption Program',
        phase: 'educate',
        tech: 'm365',
        serviceType: 'adoption',
        price: 2500,
        quantity: 0
      },
      {
        id: 'power-adoption',
        name: 'Power Platform Adoption Service',
        phase: 'educate',
        tech: 'power',
        serviceType: 'adoption',
        price: 2200,
        quantity: 0
      },
      
      // PLAN PHASE - ASSESSMENTS
      {
        id: 'cloud-assessment',
        name: 'Cloud Readiness Assessment',
        phase: 'plan',
        tech: 'azure',
        serviceType: 'assessment',
        price: 1800,
        quantity: 0
      },
      {
        id: 'm365-assessment',
        name: 'Microsoft 365 Assessment',
        phase: 'plan',
        tech: 'm365',
        serviceType: 'assessment',
        price: 1500,
        quantity: 0
      },
      
      // PLAN PHASE - RISK ASSESSMENTS
      {
        id: 'security-risk',
        name: 'Security Risk Assessment',
        phase: 'plan',
        tech: 'security',
        serviceType: 'risk-assessment',
        price: 3000,
        quantity: 0
      },
      {
        id: 'cloud-risk',
        name: 'Cloud Security Risk Assessment',
        phase: 'plan',
        tech: 'azure',
        serviceType: 'risk-assessment',
        price: 2800,
        quantity: 0
      },
      
      // PLAN PHASE - ARCHITECTURE
      {
        id: 'cloud-architecture',
        name: 'Cloud Architecture Review',
        phase: 'plan',
        tech: 'azure',
        serviceType: 'architecture',
        price: 2200,
        quantity: 0
      },
      {
        id: 'modern-architecture',
        name: 'Modern Workplace Architecture',
        phase: 'plan',
        tech: 'm365',
        serviceType: 'architecture',
        price: 2500,
        quantity: 0
      },
      
      // IMPLEMENT PHASE - ONBOARDING
      {
        id: 'm365-deployment',
        name: 'Microsoft 365 Deployment',
        phase: 'implement',
        tech: 'm365',
        serviceType: 'onboarding',
        price: 3500,
        quantity: 0
      },
      {
        id: 'azure-migration',
        name: 'Azure Migration Service',
        phase: 'implement',
        tech: 'azure',
        serviceType: 'onboarding',
        price: 5000,
        quantity: 0
      },
      
      // IMPLEMENT PHASE - MANAGED SERVICES
      {
        id: 'security-managed',
        name: 'Security Managed Service (monthly)',
        phase: 'implement',
        tech: 'security',
        serviceType: 'managed',
        price: 2000,
        quantity: 0
      },
      {
        id: 'cloud-managed',
        name: 'Cloud Infrastructure Management',
        phase: 'implement',
        tech: 'azure',
        serviceType: 'managed',
        price: 3500,
        quantity: 0
      }
    ]);
  }, []);

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
      if (filters.serviceType !== 'all' && item.serviceType !== filters.serviceType) {
        return false;
      }
      if (filters.tech !== 'all' && item.tech !== filters.tech) {
        return false;
      }
      return true;
    });
  };

  // Calculate total price
  const calculateTotal = () => {
    return serviceItems.reduce((total, item) => {
      return total + (item.quantity * item.price);
    }, 0) * currentCurrency.rate;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `${currentCurrency.symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
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

  // Calculate quote total
  const calculateQuoteTotal = () => {
    return quoteItems.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0) * currentCurrency.rate;
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
        setCurrentCurrency,
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