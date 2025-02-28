import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { CalculatorContext } from '../../contexts/CalculatorContext';

const ServiceItem = ({ service, updateQuantity, formatCurrency }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { serviceTiers, updateTier } = useContext(CalculatorContext);
  const { t } = useTranslation();
  
  // Initialize the selected tier from context or default
  const [selectedTier, setSelectedTier] = useState(
    service.hasTiers ? (serviceTiers[service.id] || service.defaultTier) : null
  );
  
  // Update the local state when the context changes
  useEffect(() => {
    if (service.hasTiers) {
      setSelectedTier(serviceTiers[service.id] || service.defaultTier);
    }
  }, [serviceTiers, service.id, service.defaultTier, service.hasTiers]);
  
  const handleQuantityChange = (e) => {
    updateQuantity(service.id, parseInt(e.target.value) || 0);
  };

  const increment = () => {
    updateQuantity(service.id, service.quantity + 1);
  };

  const decrement = () => {
    if (service.quantity > 0) {
      updateQuantity(service.id, service.quantity - 1);
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  const handleTierChange = (e) => {
    const tierId = e.target.value;
    setSelectedTier(tierId);
    updateTier(service.id, tierId);
  };
  
  // Get the current price based on the selected tier
  const getCurrentPrice = () => {
    if (service.hasTiers && selectedTier) {
      const tier = service.tiers.find(t => t.id === selectedTier);
      return tier ? tier.price : service.price;
    }
    return service.price;
  };
  
  // Get the current description based on the selected tier
  const getCurrentDescription = () => {
    if (service.hasTiers && selectedTier) {
      const tier = service.tiers.find(t => t.id === selectedTier);
      if (tier) {
        return (
          <>
            <p className="font-medium">{service.name} - {tier.name}</p>
            <p className="mb-2">{tier.description}</p>
            <p className="mb-2">{service.description}</p>
          </>
        );
      }
    }
    return <p className="mb-2">{service.description}</p>;
  };

  // Add a tech badge based on the service's tech
  const getTechBadge = () => {
    let bgColor = '';
    let label = '';
    
    switch(service.tech) {
      case 'azure':
        bgColor = 'bg-blue-100 text-blue-800';
        label = 'Azure';
        break;
      case 'm365':
        bgColor = 'bg-red-100 text-red-800';
        label = 'M365';
        break;
      case 'power':
        bgColor = 'bg-purple-100 text-purple-800';
        label = 'Power';
        break;
      case 'security':
        bgColor = 'bg-green-100 text-green-800';
        label = 'Security';
        break;
      case 'dynamics':
        bgColor = 'bg-yellow-100 text-yellow-800';
        label = 'Dynamics';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800';
        label = service.tech;
    }
    
    return (
      <span className={`${bgColor} text-xs px-2 py-1 rounded-md font-medium`}>
        {label}
      </span>
    );
  };

  // Get badge for delivery method
  const getDeliveryMethodBadge = () => {
    let bgColor = '';
    
    switch(service.deliveryMethod) {
      case 'onsite':
        bgColor = 'bg-emerald-100 text-emerald-800';
        break;
      case 'online':
        bgColor = 'bg-indigo-100 text-indigo-800';
        break;
      case 'hybrid':
        bgColor = 'bg-amber-100 text-amber-800';
        break;
      case 'remote':
        bgColor = 'bg-pink-100 text-pink-800';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`${bgColor} text-xs px-2 py-1 rounded-md font-medium capitalize`}>
        {service.deliveryMethod}
      </span>
    );
  };
  
  // Render tier badges for services with tiers
  const renderTierBadges = () => {
    if (!service.hasTiers) return null;
    
    const tierColors = {
      bronze: 'bg-yellow-100 text-yellow-800',
      silver: 'bg-gray-100 text-gray-800',
      gold: 'bg-amber-100 text-amber-800',
      platinum: 'bg-indigo-100 text-indigo-800'
    };
    
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {service.tiers.map(tier => (
          <span 
            key={tier.id}
            onClick={() => {
              updateTier(service.id, tier.id);
              setSelectedTier(tier.id);
            }}
            className={`${tierColors[tier.id] || 'bg-gray-100 text-gray-800'} 
              text-xs px-2 py-1 rounded-md font-medium cursor-pointer
              ${selectedTier === tier.id ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            {tier.name} - {formatCurrency(tier.price)}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 border-b last:border-b-0">
      <div className="flex items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium hover:text-ms-blue cursor-pointer" onClick={toggleDetails}>
              {service.name}
              {service.hasTiers && selectedTier && ` - ${service.tiers.find(t => t.id === selectedTier)?.name}`}
            </h4>
            {getTechBadge()}
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-md">
              {service.duration}
            </span>
          </div>
          <p className="text-ms-text text-sm">{formatCurrency(getCurrentPrice())}</p>
          
          {/* Show tier selection if this service has tiers */}
          {service.hasTiers && (
            <div className="mt-2">
              <label className="block text-xs text-gray-600 mb-1">{t('selectTier')}:</label>
              <select 
                value={selectedTier || ''} 
                onChange={handleTierChange}
                className="p-1 border rounded-ms text-sm"
              >
                {service.tiers.map(tier => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name} - {formatCurrency(tier.price)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={decrement}
            className="w-8 h-8 flex items-center justify-center rounded-ms bg-gray-100 hover:bg-gray-200 text-ms-text"
            disabled={service.quantity <= 0}
          >
            -
          </button>
          <input 
            type="number" 
            min="0"
            value={service.quantity} 
            onChange={handleQuantityChange}
            className="w-12 mx-2 p-1 text-center border rounded-ms"
          />
          <button 
            onClick={increment}
            className="w-8 h-8 flex items-center justify-center rounded-ms bg-gray-100 hover:bg-gray-200 text-ms-text"
          >
            +
          </button>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-3 bg-gray-50 p-3 rounded-ms text-sm">
          {getCurrentDescription()}
          
          <div className="flex gap-2 mt-2">
            {getDeliveryMethodBadge()}
          </div>
          
          {/* Render the tier badges for easy selection if service has tiers */}
          {service.hasTiers && renderTierBadges()}
        </div>
      )}
    </div>
  );
};

export default ServiceItem;