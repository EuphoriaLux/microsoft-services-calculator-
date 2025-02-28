import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalculatorContext } from '../contexts/CalculatorContext';
import { useTranslation } from '../contexts/LanguageContext';
import QuoteSection from '../quote/QuoteSection';
import EditQuoteModal from '../quote/EditQuoteModal';

const Quote = () => {
  const { quoteItems, calculateQuoteTotal, formatCurrency, updateQuoteItem, removeQuoteItem } = useContext(CalculatorContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [editingItem, setEditingItem] = useState(null);
  const quoteSectionRef = useRef(null);
  
  const handlePrintQuote = () => {
    window.print();
  };
  
  const handleEditItem = (item) => {
    setEditingItem(item);
  };
  
  const handleCloseModal = () => {
    setEditingItem(null);
  };
  
  const handleUpdateItem = (id, quantity) => {
    updateQuoteItem(id, quantity);
    setEditingItem(null);
  };
  
  const handleRemoveItem = (id) => {
    removeQuoteItem(id);
    setEditingItem(null);
  };
  
  // If no quote items, redirect to calculator
  if (quoteItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl mb-4">{t('noItemsSelected')}</h2>
        <button 
          className="btn"
          onClick={() => navigate('/')}
        >
          {t('backToCalculator')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-ms shadow-ms p-6 print:shadow-none">
      <div className="print:hidden flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-ms-blue">{t('quote')}</h1>
        <div className="flex gap-2">
          <button 
            className="btn-secondary"
            onClick={() => navigate('/')}
          >
            {t('backToCalculator')}
          </button>
          <button 
            className="btn"
            onClick={handlePrintQuote}
          >
            {t('printQuote')}
          </button>
        </div>
      </div>
      
      <div ref={quoteSectionRef}>
        <QuoteSection 
          quoteItems={quoteItems} 
          formatCurrency={formatCurrency}
          onEditItem={handleEditItem}
        />
        
        <div className="mt-8 flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2 border-b">
              <div className="font-bold">{t('total')}</div>
              <div className="font-bold">{formatCurrency(calculateQuoteTotal())}</div>
            </div>
          </div>
        </div>
      </div>
      
      {editingItem && (
        <EditQuoteModal 
          item={editingItem}
          onClose={handleCloseModal}
          onUpdate={handleUpdateItem}
          onRemove={handleRemoveItem}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
};

export default Quote;