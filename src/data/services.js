/**
 * Services data for Microsoft Services Calculator
 * This file contains all service definitions used in the application
 */

const services = [
    // EDUCATE PHASE - WORKSHOPS
    {
      id: 'azure-workshop',
      name: 'Azure Cloud Workshop (1 day)',
      description: 'Comprehensive introduction to Azure cloud services and architecture.',
      phase: 'educate',
      tech: 'azure',
      serviceType: 'workshop',
      price: 1200,
      duration: '1 day',
      deliveryMethod: 'onsite',
    },
    {
      id: 'm365-workshop',
      name: 'Microsoft 365 Workshop (1 day)',
      description: 'Explore Microsoft 365 capabilities, security features and productivity tools.',
      phase: 'educate',
      tech: 'm365',
      serviceType: 'workshop',
      price: 1000,
      duration: '1 day',
      deliveryMethod: 'onsite',
    },
    {
      id: 'power-workshop',
      name: 'Power Platform Workshop (2 days)',
      description: 'Learn to build business solutions with Power Apps, Power Automate, and Power BI.',
      phase: 'educate',
      tech: 'power',
      serviceType: 'workshop',
      price: 1800,
      duration: '2 days',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'security-workshop',
      name: 'Security Best Practices Workshop',
      description: 'In-depth workshop covering Microsoft security fundamentals and best practices.',
      phase: 'educate',
      tech: 'security',
      serviceType: 'workshop',
      price: 1500,
      duration: '1 day',
      deliveryMethod: 'online',
    },
    {
      id: 'dynamics-workshop',
      name: 'Dynamics 365 Workshop',
      description: 'Overview of Dynamics 365 capabilities for sales, customer service, and operations.',
      phase: 'educate',
      tech: 'dynamics',
      serviceType: 'workshop',
      price: 1300,
      duration: '1 day',
      deliveryMethod: 'online',
    },
    
    // EDUCATE PHASE - ADOPTION
    {
      id: 'teams-adoption',
      name: 'Teams Adoption Program',
      description: 'Structured program to drive adoption of Microsoft Teams across your organization.',
      phase: 'educate',
      tech: 'm365',
      serviceType: 'adoption',
      price: 2500,
      duration: '4 weeks',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'power-adoption',
      name: 'Power Platform Adoption Service',
      description: 'Guide your organization to successful Power Platform implementation and adoption.',
      phase: 'educate',
      tech: 'power',
      serviceType: 'adoption',
      price: 2200,
      duration: '3 weeks',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'm365-adoption',
      name: 'Microsoft 365 Adoption Service',
      description: 'Comprehensive adoption plan for Microsoft 365 tools and services.',
      phase: 'educate',
      tech: 'm365',
      serviceType: 'adoption',
      price: 3000,
      duration: '6 weeks',
      deliveryMethod: 'hybrid',
    },
    
    // PLAN PHASE - ASSESSMENTS
    {
      id: 'cloud-assessment',
      name: 'Cloud Readiness Assessment',
      description: 'Evaluate your organization\'s readiness to adopt cloud technologies.',
      phase: 'plan',
      tech: 'azure',
      serviceType: 'assessment',
      price: 1800,
      duration: '2 weeks',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'm365-assessment',
      name: 'Microsoft 365 Assessment',
      description: 'Assess your current environment and define a roadmap for Microsoft 365 adoption.',
      phase: 'plan',
      tech: 'm365',
      serviceType: 'assessment',
      price: 1500,
      duration: '1 week',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'power-assessment',
      name: 'Power Platform Assessment',
      description: 'Evaluate opportunities for automation and business process improvement.',
      phase: 'plan',
      tech: 'power',
      serviceType: 'assessment',
      price: 1600,
      duration: '1 week',
      deliveryMethod: 'hybrid',
    },
    
    // PLAN PHASE - RISK ASSESSMENTS
    {
      id: 'security-risk',
      name: 'Security Risk Assessment',
      description: 'Comprehensive evaluation of your organization\'s security posture and risks.',
      phase: 'plan',
      tech: 'security',
      serviceType: 'risk-assessment',
      price: 3000,
      duration: '2 weeks',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'cloud-risk',
      name: 'Cloud Security Risk Assessment',
      description: 'Identify security risks in your Azure environment and cloud infrastructure.',
      phase: 'plan',
      tech: 'azure',
      serviceType: 'risk-assessment',
      price: 2800,
      duration: '2 weeks',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'm365-security-risk',
      name: 'Microsoft 365 Security Assessment',
      description: 'Evaluate your Microsoft 365 security configuration and identity management.',
      phase: 'plan',
      tech: 'security',
      serviceType: 'risk-assessment',
      price: 2400,
      duration: '1 week',
      deliveryMethod: 'hybrid',
    },
    
    // PLAN PHASE - ARCHITECTURE
    {
      id: 'cloud-architecture',
      name: 'Cloud Architecture Review',
      description: 'Expert review of your cloud architecture design and implementation.',
      phase: 'plan',
      tech: 'azure',
      serviceType: 'architecture',
      price: 2200,
      duration: '1 week',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'modern-architecture',
      name: 'Modern Workplace Architecture',
      description: 'Design a modern workplace architecture based on Microsoft 365.',
      phase: 'plan',
      tech: 'm365',
      serviceType: 'architecture',
      price: 2500,
      duration: '1 week',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'app-architecture',
      name: 'Application Modernization Architecture',
      description: 'Design architecture for modernizing legacy applications with Azure services.',
      phase: 'plan',
      tech: 'azure',
      serviceType: 'architecture',
      price: 3000,
      duration: '2 weeks',
      deliveryMethod: 'hybrid',
    },
    
    // IMPLEMENT PHASE - ONBOARDING
    {
      id: 'm365-deployment',
      name: 'Microsoft 365 Deployment',
      description: 'End-to-end deployment of Microsoft 365 services for your organization.',
      phase: 'implement',
      tech: 'm365',
      serviceType: 'onboarding',
      price: 3500,
      duration: '3 weeks',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'azure-migration',
      name: 'Azure Migration Service',
      description: 'Migrate your on-premises infrastructure and applications to Azure.',
      phase: 'implement',
      tech: 'azure',
      serviceType: 'onboarding',
      price: 5000,
      duration: '4 weeks',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'teams-deployment',
      name: 'Teams Voice Deployment',
      description: 'Implement Microsoft Teams as your complete phone system solution.',
      phase: 'implement',
      tech: 'm365',
      serviceType: 'onboarding',
      price: 2800,
      duration: '2 weeks',
      deliveryMethod: 'hybrid',
    },
    {
      id: 'dynamics-implementation',
      name: 'Dynamics 365 Implementation',
      description: 'Deploy and configure Dynamics 365 applications for your business needs.',
      phase: 'implement',
      tech: 'dynamics',
      serviceType: 'onboarding',
      price: 4500,
      duration: '5 weeks',
      deliveryMethod: 'hybrid',
    },
    
    // IMPLEMENT PHASE - MANAGED SERVICES
    {
      id: 'security-managed',
      name: 'Security Managed Service (monthly)',
      description: 'Ongoing monitoring, management, and optimization of your security environment.',
      phase: 'implement',
      tech: 'security',
      serviceType: 'managed',
      price: 2000,
      duration: 'monthly',
      deliveryMethod: 'remote',
    },
    {
      id: 'cloud-managed',
      name: 'Cloud Infrastructure Management',
      description: 'Comprehensive management and support for your Azure cloud infrastructure.',
      phase: 'implement',
      tech: 'azure',
      serviceType: 'managed',
      price: 3500,
      duration: 'monthly',
      deliveryMethod: 'remote',
    },
    {
      id: 'm365-managed',
      name: 'Microsoft 365 Managed Service',
      description: 'Ongoing support, administration, and optimization of Microsoft 365.',
      phase: 'implement',
      tech: 'm365',
      serviceType: 'managed',
      price: 1800,
      duration: 'monthly',
      deliveryMethod: 'remote',
    },
    {
      id: 'power-managed',
      name: 'Power Platform Administration',
      description: 'Managed service for Power Platform administration and governance.',
      phase: 'implement',
      tech: 'power',
      serviceType: 'managed',
      price: 1500,
      duration: 'monthly',
      deliveryMethod: 'remote',
    }
  ];
  
  /**
   * Get all services
   * @returns {Array} All service objects
   */
  export const getAllServices = () => {
    return services;
  };
  
  /**
   * Get a specific service by ID
   * @param {string} id - The service ID to find
   * @returns {Object|null} The service object or null if not found
   */
  export const getServiceById = (id) => {
    return services.find(service => service.id === id) || null;
  };
  
  /**
   * Filter services by various criteria
   * @param {Object} filters - Object containing filter criteria
   * @param {string} [filters.phase] - Filter by phase (educate, plan, implement)
   * @param {string} [filters.tech] - Filter by technology (azure, m365, etc.)
   * @param {string} [filters.serviceType] - Filter by service type (workshop, assessment, etc.)
   * @returns {Array} Filtered service objects
   */
  export const filterServices = (filters = {}) => {
    return services.filter(service => {
      if (filters.phase && filters.phase !== 'all' && service.phase !== filters.phase) {
        return false;
      }
      if (filters.tech && filters.tech !== 'all' && service.tech !== filters.tech) {
        return false;
      }
      if (filters.serviceType && filters.serviceType !== 'all' && service.serviceType !== filters.serviceType) {
        return false;
      }
      return true;
    });
  };
  
  /**
   * Group services by a specific property
   * @param {string} property - The property to group by (phase, tech, serviceType)
   * @returns {Object} An object with keys for each group and arrays of services as values
   */
  export const groupServicesByProperty = (property) => {
    return services.reduce((acc, service) => {
      const key = service[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(service);
      return acc;
    }, {});
  };
  
  export default services;