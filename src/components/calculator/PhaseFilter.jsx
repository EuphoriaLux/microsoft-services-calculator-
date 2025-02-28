import React, { useContext } from 'react';
import { CalculatorContext } from '../../contexts/CalculatorContext';
import { useTranslation } from '../../contexts/LanguageContext';
import services from '../../data/services';

const PhaseFilter = () => {
  const { filters, setFilters } = useContext(CalculatorContext);
  const { t } = useTranslation();
  
  // Get service types available in each phase
  const getServiceTypesForPhase = (phase) => {
    return [...new Set(
      services
        .filter(service => service.phase === phase)
        .map(service => service.serviceType)
    )];
  };
  
  const educateServiceTypes = getServiceTypesForPhase('educate');
  const planServiceTypes = getServiceTypesForPhase('plan');
  const implementServiceTypes = getServiceTypesForPhase('implement');
  
  const handlePhaseFilter = (phase) => {
    // Reset other filters when changing phase
    setFilters({
      phase,
      serviceType: 'all',
      tech: 'all'
    });
  };

  return (
    <div className="bg-white rounded-ms shadow-ms p-6 mb-6">
      <h2 className="text-xl font-bold text-ms-blue mb-4">{t('selectPhase')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Educate Phase Card */}
        <div 
          className={`border rounded-ms p-4 cursor-pointer transition-all ${
            filters.phase === 'educate' 
              ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
          onClick={() => handlePhaseFilter('educate')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-ms-blue">{t('educate')}</h3>
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
          </div>
          <p className="text-ms-text text-sm mb-3">{t('educateDescription')}</p>
          <div className="flex flex-wrap gap-1 text-xs">
            {educateServiceTypes.map(type => (
              <span key={type} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                {t(type === 'risk-assessment' ? 'riskAssessment' : type)}
              </span>
            ))}
          </div>
        </div>
        
        {/* Plan Phase Card */}
        <div 
          className={`border rounded-ms p-4 cursor-pointer transition-all ${
            filters.phase === 'plan' 
              ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
          onClick={() => handlePhaseFilter('plan')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-ms-blue">{t('plan')}</h3>
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</div>
          </div>
          <p className="text-ms-text text-sm mb-3">{t('planDescription')}</p>
          <div className="flex flex-wrap gap-1 text-xs">
            {planServiceTypes.map(type => (
              <span key={type} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                {t(type === 'risk-assessment' ? 'riskAssessment' : type)}
              </span>
            ))}
          </div>
        </div>
        
        {/* Implement Phase Card */}
        <div 
          className={`border rounded-ms p-4 cursor-pointer transition-all ${
            filters.phase === 'implement' 
              ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
          onClick={() => handlePhaseFilter('implement')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-ms-blue">{t('implement')}</h3>
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">3</div>
          </div>
          <p className="text-ms-text text-sm mb-3">{t('implementDescription')}</p>
          <div className="flex flex-wrap gap-1 text-xs">
            {implementServiceTypes.map(type => (
              <span key={type} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                {t(type === 'risk-assessment' ? 'riskAssessment' : type)}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {filters.phase !== 'all' && (
        <div className="mt-4 flex justify-end">
          <button 
            className="text-ms-blue hover:underline font-medium text-sm"
            onClick={() => handlePhaseFilter('all')}
          >
            {t('viewAllPhases')}
          </button>
        </div>
      )}
    </div>
  );
};

export default PhaseFilter;