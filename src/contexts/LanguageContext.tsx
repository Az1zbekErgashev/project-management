import { routes } from 'config/config';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import i18n from 'utils/i18n';

interface LanguageContextProps {
  language: string;
  changeLanguage: (newLanguage: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('language') || '0';
  });
  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
    i18n.services.backendConnector.backend.options.loadPath = `${routes.api.baseUrl}/api/multilingualtext?language=${language}`;

    // Перезагрузка переводов
    i18n.reloadResources();
  }, [language]);

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const value: LanguageContextProps = {
    language,
    changeLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
