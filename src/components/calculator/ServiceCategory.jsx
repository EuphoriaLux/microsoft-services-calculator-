import React from 'react';
import ServiceItem from './ServiceItem';
import { useTranslation } from '../../contexts/LanguageContext';

const ServiceCategory = ({ serviceType, services, updateQuantity, formatCurrency }) => {
  const { t } = useTranslation();
  
  // Get service type title based on the service type key
  const getServiceTypeTitle = () => {
    switch(serviceType) {
      case 'workshop':
        return t('workshop');
      case 'assessment':
        return t('assessment');
      case 'risk-assessment':
        return t('riskAssessment');
      case 'architecture':
        return t('architecture');
      case 'adoption':
        return t('adoption');
      case 'onboarding':
        return t('onboarding');
      case 'managed':
        return t('managed');
      default:
        return serviceType;
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{getServiceTypeTitle()}</h3>
      <div className="bg-white rounded-ms shadow-ms">
        {services.map(service => (
          <ServiceItem 
            key={service.id}
            service={service}
            updateQuantity={updateQuantity}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCategory;