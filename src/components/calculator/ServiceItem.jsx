import React, { useState } from 'react';

const ServiceItem = ({ service, updateQuantity, formatCurrency }) => {
  const [showDetails, setShowDetails] = useState(false);
  
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

  return (
    <div className="p-4 border-b last:border-b-0">
      <div className="flex items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium hover:text-ms-blue cursor-pointer" onClick={toggleDetails}>
              {service.name}
            </h4>
            {getTechBadge()}
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-md">
              {service.duration}
            </span>
          </div>
          <p className="text-ms-text text-sm">{formatCurrency(service.price)}</p>
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
          <p className="mb-2">{service.description}</p>
          <div className="flex gap-2 mt-2">
            {getDeliveryMethodBadge()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceItem;