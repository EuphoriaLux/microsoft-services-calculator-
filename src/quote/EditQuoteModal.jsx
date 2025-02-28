import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const EditQuoteModal = ({ item, onClose, onUpdate, onRemove, formatCurrency }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [selectedTier, setSelectedTier] = useState(item.selectedTier || null);
  const { t } = useTranslation();

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value) || 0);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleTierChange = (e) => {
    setSelectedTier(e.target.value);
  };
  
  // Get the price based on the currently selected tier
  const getCurrentPrice = () => {
    if (item.hasTiers && selectedTier) {
      const tier = item.tiers.find(t => t.id === selectedTier);
      return tier ? tier.price : item.price;
    }
    return item.price;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(item.id, quantity, selectedTier);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-ms p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{t('editQuote')}</h2>
        
        <div className="mb-4">
          <h3 className="font-medium">{item.name}</h3>
          
          {/* Tier selection if the service has tiers */}
          {item.hasTiers && (
            <div className="my-3">
              <label className="block mb-1 font-medium">{t('tier')}</label>
              <select 
                value={selectedTier || ''}
                onChange={handleTierChange}
                className="w-full p-2 border rounded-ms mb-2"
              >
                {item.tiers.map(tier => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name} - {formatCurrency(tier.price)}
                  </option>
                ))}
              </select>
              {selectedTier && (
                <p className="text-sm text-gray-600">
                  {item.tiers.find(t => t.id === selectedTier)?.description}
                </p>
              )}
            </div>
          )}
          
          <p className="text-ms-text text-sm">{formatCurrency(getCurrentPrice())} {t('perUnit')}</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{t('quantity')}</label>
            <div className="flex items-center">
              <button 
                type="button"
                onClick={handleDecrement}
                className="w-10 h-10 flex items-center justify-center rounded-ms bg-gray-100 hover:bg-gray-200 text-ms-text"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input 
                type="number" 
                min="1"
                value={quantity} 
                onChange={handleQuantityChange}
                className="w-20 mx-2 p-2 text-center border rounded-ms"
              />
              <button 
                type="button"
                onClick={handleIncrement}
                className="w-10 h-10 flex items-center justify-center rounded-ms bg-gray-100 hover:bg-gray-200 text-ms-text"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex justify-between mb-4">
            <div>{t('total')}</div>
            <div className="font-bold">{formatCurrency(getCurrentPrice() * quantity)}</div>
          </div>
          
          <div className="flex justify-between">
            <div>
              <button 
                type="button"
                onClick={() => onRemove(item.id)}
                className="text-red-600 hover:underline"
              >
                {t('deleteItem')}
              </button>
            </div>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                {t('cancel')}
              </button>
              <button 
                type="submit"
                className="btn"
              >
                {t('saveChanges')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuoteModal;