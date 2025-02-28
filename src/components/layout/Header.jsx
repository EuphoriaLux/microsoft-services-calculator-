import React, { useContext } from 'react';
import { CalculatorContext } from '../../contexts/CalculatorContext';
import { useTranslation } from '../../contexts/LanguageContext';

const Header = () => {
  const { currentLang, setCurrentLang } = useContext(CalculatorContext);
  const { t, setLanguage } = useTranslation();
  
  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setLanguage(lang);
  };

  return (
    <header className="bg-white rounded-ms shadow-ms text-center mb-8 p-5">
      <div className="w-[180px] mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23">
          <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
          <path fill="#f35325" d="M1 1h10v10H1z"/>
          <path fill="#81bc06" d="M12 1h10v10H12z"/>
          <path fill="#05a6f0" d="M1 12h10v10H1z"/>
          <path fill="#ffba08" d="M12 12h10v10H12z"/>
        </svg>
      </div>
      
      <h1 className="text-2xl text-ms-blue mb-2">{t('mainTitle')}</h1>
      <p className="text-ms-text">{t('subtitle')}</p>
      
      <div className="flex justify-center gap-2 mt-4">
        <button 
          className={`px-4 py-2 border border-ms-blue rounded-ms ${currentLang === 'en' ? 'bg-ms-blue text-white' : 'bg-white text-ms-blue hover:bg-blue-50'}`}
          onClick={() => handleLanguageChange('en')}
        >
          English
        </button>
        <button 
          className={`px-4 py-2 border border-ms-blue rounded-ms ${currentLang === 'fr' ? 'bg-ms-blue text-white' : 'bg-white text-ms-blue hover:bg-blue-50'}`}
          onClick={() => handleLanguageChange('fr')}
        >
          Français
        </button>
        <button 
          className={`px-4 py-2 border border-ms-blue rounded-ms ${currentLang === 'de' ? 'bg-ms-blue text-white' : 'bg-white text-ms-blue hover:bg-blue-50'}`}
          onClick={() => handleLanguageChange('de')}
        >
          Deutsch
        </button>
      </div>
    </header>
  );
};

export default Header;