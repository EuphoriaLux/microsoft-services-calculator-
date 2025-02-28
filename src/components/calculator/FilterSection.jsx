import React, { useContext, useMemo } from 'react';
import { CalculatorContext } from '../../contexts/CalculatorContext';
import { useTranslation } from '../../contexts/LanguageContext';
import services from '../../data/services';

const FilterSection = () => {
  const { filters, setFilters } = useContext(CalculatorContext);
  const { t } = useTranslation();
  
  // Get available service types based on selected phase
  const availableServiceTypes = useMemo(() => {
    if (filters.phase === 'all') {
      return ['workshop', 'assessment', 'risk-assessment', 'architecture', 'adoption', 'onboarding', 'managed'];
    }
    
    // Get unique service types for the selected phase
    const serviceTypesForPhase = [...new Set(
      services
        .filter(service => service.phase === filters.phase)
        .map(service => service.serviceType)
    )];
    
    return serviceTypesForPhase;
  }, [filters.phase]);
  
  // Get available technologies based on selected phase and service type
  const availableTechnologies = useMemo(() => {
    let filteredServices = services;
    
    // Filter by phase if not 'all'
    if (filters.phase !== 'all') {
      filteredServices = filteredServices.filter(service => service.phase === filters.phase);
    }
    
    // Filter by service type if not 'all'
    if (filters.serviceType !== 'all') {
      filteredServices = filteredServices.filter(service => service.serviceType === filters.serviceType);
    }
    
    // Get unique technologies
    const techs = [...new Set(filteredServices.map(service => service.tech))];
    return techs;
  }, [filters.phase, filters.serviceType]);
  
  const handleServiceTypeFilter = (serviceType) => {
    setFilters(prev => ({ ...prev, serviceType }));
  };
  
  const handleTechFilter = (tech) => {
    setFilters(prev => ({ ...prev, tech }));
  };

  // Reset to 'all' if the current service type isn't available in the selected phase
  React.useEffect(() => {
    if (filters.serviceType !== 'all' && !availableServiceTypes.includes(filters.serviceType)) {
      setFilters(prev => ({ ...prev, serviceType: 'all' }));
    }
    
    if (filters.tech !== 'all' && !availableTechnologies.includes(filters.tech)) {
      setFilters(prev => ({ ...prev, tech: 'all' }));
    }
  }, [filters.phase, filters.serviceType, availableServiceTypes, availableTechnologies]);

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
            
            {availableServiceTypes.includes('workshop') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.serviceType === 'workshop' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleServiceTypeFilter('workshop')}
              >
                {t('workshop')}
              </button>
            )}
            
            {availableServiceTypes.includes('assessment') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.serviceType === 'assessment' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleServiceTypeFilter('assessment')}
              >
                {t('assessment')}
              </button>
            )}
            
            {availableServiceTypes.includes('risk-assessment') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.serviceType === 'risk-assessment' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleServiceTypeFilter('risk-assessment')}
              >
                {t('riskAssessment')}
              </button>
            )}
            
            {availableServiceTypes.includes('architecture') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.serviceType === 'architecture' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleServiceTypeFilter('architecture')}
              >
                {t('architecture')}
              </button>
            )}
            
            {availableServiceTypes.includes('adoption') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.serviceType === 'adoption' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleServiceTypeFilter('adoption')}
              >
                {t('adoption')}
              </button>
            )}
            
            {availableServiceTypes.includes('onboarding') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.serviceType === 'onboarding' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleServiceTypeFilter('onboarding')}
              >
                {t('onboarding')}
              </button>
            )}
            
            {availableServiceTypes.includes('managed') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.serviceType === 'managed' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleServiceTypeFilter('managed')}
              >
                {t('managed')}
              </button>
            )}
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
            
            {availableTechnologies.includes('azure') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.tech === 'azure' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleTechFilter('azure')}
              >
                {t('azure')}
              </button>
            )}
            
            {availableTechnologies.includes('m365') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.tech === 'm365' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleTechFilter('m365')}
              >
                {t('m365')}
              </button>
            )}
            
            {availableTechnologies.includes('power') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.tech === 'power' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleTechFilter('power')}
              >
                {t('power')}
              </button>
            )}
            
            {availableTechnologies.includes('security') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.tech === 'security' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleTechFilter('security')}
              >
                {t('security')}
              </button>
            )}
            
            {availableTechnologies.includes('dynamics') && (
              <button 
                className={`px-3 py-1 rounded-ms ${filters.tech === 'dynamics' ? 'bg-ms-blue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleTechFilter('dynamics')}
              >
                {t('dynamics')}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Filter Reset Button */}
      {(filters.serviceType !== 'all' || filters.tech !== 'all') && (
        <div className="mt-4 flex justify-end">
          <button 
            className="text-ms-blue hover:underline font-medium text-sm"
            onClick={() => setFilters(prev => ({ ...prev, serviceType: 'all', tech: 'all' }))}
          >
            {t('resetFilters')}
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSection;