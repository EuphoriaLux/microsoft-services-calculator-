import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    mainTitle: "Microsoft Services Price Calculator",
    subtitle: "Select services and generate a price quote",
    serviceType: "Service Type",
    primaryTech: "Primary Technology",
    phase: "Phase",
    all: "All",
    workshop: "Workshops",
    assessment: "Assessments",
    riskAssessment: "Risk Assessments",
    poc: "Proof of Concepts",
    architecture: "Architecture",
    adoption: "Adoption",
    onboarding: "Onboarding",
    managed: "Managed Services",
    proactive: "Proactive Services",
    azure: "Azure",
    m365: "Microsoft 365",
    power: "Power Platform",
    security: "Security",
    dynamics: "Dynamics 365",
    educate: "Educate",
    plan: "Plan",
    implement: "Implement",
    totalPrice: "Total Price",
    generateQuote: "Generate Quote",
    calculator: "Calculator",
    quote: "Quote",
    serviceQuote: "Microsoft Services Quote",
    date: "Date",
    total: "Total",
    printQuote: "Print Quote",
    backToCalculator: "Back to Calculator",
    editQuote: "Edit Quote",
    deleteItem: "Delete",
    saveChanges: "Save Changes",
    cancel: "Cancel"
  },
  fr: {
    mainTitle: "Calculateur de Prix des Services Microsoft",
    subtitle: "Sélectionnez les services et générez un devis",
    serviceType: "Type de Service",
    primaryTech: "Technologie Principale",
    phase: "Phase",
    all: "Tous",
    workshop: "Ateliers",
    assessment: "Évaluations",
    riskAssessment: "Évaluations des Risques",
    poc: "Preuves de Concept",
    architecture: "Architecture",
    adoption: "Adoption",
    onboarding: "Intégration",
    managed: "Services Gérés",
    proactive: "Services Proactifs",
    azure: "Azure",
    m365: "Microsoft 365",
    power: "Power Platform",
    security: "Sécurité",
    dynamics: "Dynamics 365",
    educate: "Éduquer",
    plan: "Planifier",
    implement: "Implémenter",
    totalPrice: "Prix Total",
    generateQuote: "Générer un Devis",
    calculator: "Calculateur",
    quote: "Devis",
    serviceQuote: "Devis de Services Microsoft",
    date: "Date",
    total: "Total",
    printQuote: "Imprimer le Devis",
    backToCalculator: "Retour au Calculateur",
    editQuote: "Modifier",
    deleteItem: "Supprimer",
    saveChanges: "Enregistrer",
    cancel: "Annuler"
  },
  de: {
    mainTitle: "Microsoft Services Preisrechner",
    subtitle: "Wählen Sie Dienstleistungen und erstellen Sie ein Angebot",
    serviceType: "Service-Typ",
    primaryTech: "Primäre Technologie",
    phase: "Phase",
    all: "Alle",
    workshop: "Workshops",
    assessment: "Bewertungen",
    riskAssessment: "Risikobewertungen",
    poc: "Proof of Concepts",
    architecture: "Architektur",
    adoption: "Einführung",
    onboarding: "Onboarding",
    managed: "Verwaltete Dienste",
    proactive: "Proaktive Dienste",
    azure: "Azure",
    m365: "Microsoft 365",
    power: "Power Platform",
    security: "Sicherheit",
    dynamics: "Dynamics 365",
    educate: "Schulen",
    plan: "Planen",
    implement: "Implementieren",
    totalPrice: "Gesamtpreis",
    generateQuote: "Angebot Erstellen",
    calculator: "Rechner",
    quote: "Angebot",
    serviceQuote: "Microsoft Dienstleistungen Angebot",
    date: "Datum",
    total: "Gesamt",
    printQuote: "Angebot Drucken",
    backToCalculator: "Zurück zum Rechner",
    editQuote: "Bearbeiten",
    deleteItem: "Löschen",
    saveChanges: "Speichern",
    cancel: "Abbrechen"
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};