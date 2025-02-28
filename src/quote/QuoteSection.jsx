import React from 'react';
import QuoteItem from './QuoteItem';
import { useTranslation } from '../contexts/LanguageContext';

const QuoteSection = ({ quoteItems, formatCurrency, onEditItem }) => {
  const { t } = useTranslation();

  // Group items by phase
  const groupedByPhase = quoteItems.reduce((acc, item) => {
    if (!acc[item.phase]) {
      acc[item.phase] = [];
    }
    acc[item.phase].push(item);
    return acc;
  }, {});

  // Order phases
  const orderedPhases = ['educate', 'plan', 'implement'].filter(phase => groupedByPhase[phase]?.length > 0);

  // Get phase title based on the phase key
  const getPhaseTitle = (phase) => {
    switch(phase) {
      case 'educate':
        return t('educate');
      case 'plan':
        return t('plan');
      case 'implement':
        return t('implement');
      default:
        return phase;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t('serviceQuote')}</h2>
        <div className="text-right">
          <div className="font-medium">{t('date')}</div>
          <div>{new Date().toLocaleDateString()}</div>
        </div>
      </div>
      
      {orderedPhases.map(phase => (
        <div key={phase} className="mb-6">
          <h3 className="text-lg font-semibold text-ms-blue mb-3">{getPhaseTitle(phase)}</h3>
          <div className="border rounded-ms overflow-hidden">
            {groupedByPhase[phase].map(item => (
              <QuoteItem 
                key={item.id}
                item={item}
                formatCurrency={formatCurrency}
                onEdit={() => onEditItem(item)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuoteSection;