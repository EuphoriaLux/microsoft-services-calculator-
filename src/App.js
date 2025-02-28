import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Calculator from './pages/Calculator';
import Quote from './pages/Quote';
import { CalculatorProvider } from './contexts/CalculatorContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  // Detect if we're on GitHub Pages and get the repository name from the URL
  const isGitHubPages = window.location.hostname.includes('github.io');
  const basename = isGitHubPages ? '/microsoft-services-calculator-' : '/';

  return (
    <LanguageProvider>
      <CalculatorProvider>
        <Router basename={basename}>
          <Layout>
            <Routes>
              <Route path="/" element={<Calculator />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </Router>
      </CalculatorProvider>
    </LanguageProvider>
  );
}

export default App;