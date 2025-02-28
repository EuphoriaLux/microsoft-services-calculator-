import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalculatorContext } from '../../contexts/CalculatorContext';
import { useTranslation } from '../../contexts/LanguageContext';

const TotalSection = () => {
  const { calculateTotal, formatCurrency, generateQuote } = useContext(CalculatorContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const total = calculateTotal();
  
  const handleGenerateQuote = () => {
    generateQuote();
    navigate('/quote');
  };
  
  return (
    <div className="bg-white rounded-ms shadow-ms p-6 sticky bottom-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-ms-blue">{t('totalPrice')}</h3>
        <div className="text-xl font-bold">{formatCurrency(total)}</div>
      </div>
      
      <button 
        className="btn w-full flex justify-center items-center"
        onClick={handleGenerateQuote}
        disabled={total === 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
        {t('generateQuote')}
      </button>
    </div>
  );
};

export default TotalSection;