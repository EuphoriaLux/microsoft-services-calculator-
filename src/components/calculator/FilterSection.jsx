import React, { useContext } from 'react';
import { CalculatorContext } from '../../contexts/CalculatorContext';
import { useTranslation } from '../../contexts/LanguageContext';

const FilterSection = () => {
  const { filters, setFilters } = useContext(CalculatorContext);
  const { t } = useTranslation();
  
  const handleServiceTypeFilter = (serviceType) => {
    setFilters(prev => ({ ...prev, serviceType }));
  };
  
  const handleTechFilter = (tech) => {
    setFilters(prev => ({ ...prev, tech }));
  };

  return (
    <div className="bg-white rounded-ms shadow-ms p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-bold text-ms-blue mb-2">{t('serviceType')}</h3>
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-3 py-1 rounded-ms ${filters.serviceType === 'all' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleServiceTypeFilter('all')}
            >
              {t('all')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.serviceType === 'workshop' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleServiceTypeFilter('workshop')}
            >
              {t('workshop')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.serviceType === 'assessment' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleServiceTypeFilter('assessment')}
            >
              {t('assessment')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.serviceType === 'risk-assessment' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleServiceTypeFilter('risk-assessment')}
            >
              {t('riskAssessment')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.serviceType === 'architecture' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleServiceTypeFilter('architecture')}
            >
              {t('architecture')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.serviceType === 'adoption' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleServiceTypeFilter('adoption')}
            >
              {t('adoption')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.serviceType === 'onboarding' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleServiceTypeFilter('onboarding')}
            >
              {t('onboarding')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.serviceType === 'managed' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleServiceTypeFilter('managed')}
            >
              {t('managed')}
            </button>
          </div>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-bold text-ms-blue mb-2">{t('primaryTech')}</h3>
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-3 py-1 rounded-ms ${filters.tech === 'all' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleTechFilter('all')}
            >
              {t('all')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.tech === 'azure' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleTechFilter('azure')}
            >
              {t('azure')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.tech === 'm365' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleTechFilter('m365')}
            >
              {t('m365')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.tech === 'power' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleTechFilter('power')}
            >
              {t('power')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.tech === 'security' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleTechFilter('security')}
            >
              {t('security')}
            </button>
            <button 
              className={`px-3 py-1 rounded-ms ${filters.tech === 'dynamics' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handleTechFilter('dynamics')}
            >
              {t('dynamics')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;