import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const QuoteItem = ({ item, formatCurrency, onEdit }) => {
  const { t } = useTranslation();
  
  // Add a tech badge based on the service's tech
  const getTechBadge = () => {
    let bgColor = '';
    let label = '';
    
    switch(item.tech) {
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
        label = item.tech;
    }
    
    return (
      <span className={`${bgColor} text-xs px-2 py-1 rounded-md font-medium`}>
        {label}
      </span>
    );
  };

  return (
    <div className="p-4 border-b last:border-b-0 flex items-center">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium">{item.name}</h4>
          {getTechBadge()}
        </div>
        <p className="text-ms-text text-sm">{formatCurrency(item.price)} × {item.quantity}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-medium">{formatCurrency(item.totalPrice)}</div>
        </div>
        
        <button 
          onClick={onEdit}
          className="print:hidden p-2 text-ms-blue hover:bg-blue-50 rounded-ms"
        >
          {t('editQuote')}
        </button>
      </div>
    </div>
  );
};

export default QuoteItem;