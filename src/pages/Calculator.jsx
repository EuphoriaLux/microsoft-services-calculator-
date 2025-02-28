import React, { useContext } from 'react';
import { CalculatorContext } from '../contexts/CalculatorContext';
import FilterSection from '../components/calculator/FilterSection';
import PhaseFilter from '../components/calculator/PhaseFilter';
import PhaseSection from '../components/calculator/PhaseSection';
import TotalSection from '../components/calculator/TotalSection';

const Calculator = () => {
  const { getFilteredServices, updateQuantity, formatCurrency, filters } = useContext(CalculatorContext);
  
  const filteredServices = getFilteredServices();
  
  // Group services by phase
  const groupedByPhase = filteredServices.reduce((acc, service) => {
    if (!acc[service.phase]) {
      acc[service.phase] = [];
    }
    acc[service.phase].push(service);
    return acc;
  }, {});

  // Order phases
  const orderedPhases = ['educate', 'plan', 'implement'].filter(phase => 
    filters.phase === 'all' || filters.phase === phase ? 
    groupedByPhase[phase]?.length > 0 : false
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        {/* Phase filter - primary filter */}
        <PhaseFilter />
        
        {/* Secondary filters (service type, tech) */}
        <FilterSection />
        
        {/* Display phases based on filters */}
        {orderedPhases.map(phase => (
          <PhaseSection 
            key={phase}
            phase={phase}
            services={groupedByPhase[phase]}
            updateQuantity={updateQuantity}
            formatCurrency={formatCurrency}
          />
        ))}
        
        {/* Show message if no services match the filters */}
        {orderedPhases.length === 0 && (
          <div className="bg-white rounded-ms shadow-ms p-8 text-center">
            <h3 className="text-lg text-ms-text mb-2">No services match your current filters</h3>
            <p className="text-ms-text text-sm">Try adjusting your filters to see more services</p>
          </div>
        )}
      </div>
      
      <div className="lg:w-80">
        <TotalSection />
      </div>
    </div>
  );
};

export default Calculator;