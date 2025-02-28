import React from 'react';
import ServiceCategory from './ServiceCategory';
import { useTranslation } from '../../contexts/LanguageContext';

const PhaseSection = ({ phase, services, updateQuantity, formatCurrency }) => {
  const { t } = useTranslation();
  
  // Group services by service type
  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.serviceType]) {
      acc[service.serviceType] = [];
    }
    acc[service.serviceType].push(service);
    return acc;
  }, {});

  // Get phase title based on the phase key
  const getPhaseTitle = () => {
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
    <div className="mb-8">
      <h2 className="text-xl text-ms-blue font-bold mb-4">{getPhaseTitle()}</h2>
      
      {Object.entries(groupedServices).map(([serviceType, services]) => (
        <ServiceCategory 
          key={serviceType}
          serviceType={serviceType}
          services={services}
          updateQuantity={updateQuantity}
          formatCurrency={formatCurrency}
        />
      ))}
    </div>
  );
};

export default PhaseSection;