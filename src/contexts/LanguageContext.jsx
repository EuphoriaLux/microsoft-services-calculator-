import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    mainTitle: "Microsoft Services Price Calculator",
    subtitle: "Select services and generate a price quote",
    serviceType: "Service Type",
    primaryTech: "Primary Technology",
    phase: "Phase",
    selectPhase: "Select your journey phase",
    viewAllPhases: "View all phases",
    resetFilters: "Reset filters",
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
    educateDescription: "Build awareness and skills through workshops and training to prepare your organization for Microsoft technologies.",
    plan: "Plan",
    planDescription: "Assess your current environment, define architecture, and develop strategy with expert guidance.",
    implement: "Implement",
    implementDescription: "Deploy, migrate, and manage Microsoft services with professional support and managed services.",
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
    cancel: "Cancel",
    quantity: "Quantity",
    perUnit: "per unit",
    noItemsSelected: "No items selected",
    currency: "Currency",
    tier: "Tier",
    selectTier: "Select tier",
    bronze: "Bronze",
    silver: "Silver",
    gold: "Gold",
    platinum: "Platinum"
  },
  fr: {
    mainTitle: "Calculateur de Prix des Services Microsoft",
    subtitle: "Sélectionnez les services et générez un devis",
    serviceType: "Type de Service",
    primaryTech: "Technologie Principale",
    phase: "Phase",
    selectPhase: "Sélectionnez votre phase de parcours",
    viewAllPhases: "Voir toutes les phases",
    resetFilters: "Réinitialiser les filtres",
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
    educateDescription: "Développez les connaissances et les compétences grâce à des ateliers et des formations pour préparer votre organisation aux technologies Microsoft.",
    plan: "Planifier",
    planDescription: "Évaluez votre environnement actuel, définissez l'architecture et développez une stratégie avec l'aide d'experts.",
    implement: "Implémenter",
    implementDescription: "Déployez, migrez et gérez les services Microsoft avec un support professionnel et des services gérés.",
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
    cancel: "Annuler",
    quantity: "Quantité",
    perUnit: "par unité",
    noItemsSelected: "Aucun élément sélectionné",
    currency: "Devise",
    tier: "Niveau",
    selectTier: "Sélectionner le niveau",
    bronze: "Bronze",
    silver: "Argent",
    gold: "Or",
    platinum: "Platine"
  },
  de: {
    mainTitle: "Microsoft Services Preisrechner",
    subtitle: "Wählen Sie Dienstleistungen und erstellen Sie ein Angebot",
    serviceType: "Service-Typ",
    primaryTech: "Primäre Technologie",
    phase: "Phase",
    selectPhase: "Wählen Sie Ihre Reisephase",
    viewAllPhases: "Alle Phasen anzeigen",
    resetFilters: "Filter zurücksetzen",
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
    educateDescription: "Bauen Sie durch Workshops und Schulungen Bewusstsein und Fähigkeiten auf, um Ihre Organisation auf Microsoft-Technologien vorzubereiten.",
    plan: "Planen",
    planDescription: "Bewerten Sie Ihre aktuelle Umgebung, definieren Sie die Architektur und entwickeln Sie eine Strategie mit Expertenberatung.",
    implement: "Implementieren",
    implementDescription: "Bereitstellen, Migrieren und Verwalten von Microsoft-Diensten mit professionellem Support und verwalteten Diensten.",
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
    cancel: "Abbrechen",
    quantity: "Menge",
    perUnit: "pro Einheit",
    noItemsSelected: "Keine Elemente ausgewählt",
    currency: "Währung",
    tier: "Stufe",
    selectTier: "Stufe auswählen",
    bronze: "Bronze",
    silver: "Silber",
    gold: "Gold",
    platinum: "Platin"
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