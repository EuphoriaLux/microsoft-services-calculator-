import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center p-4 text-gray-500 text-sm mt-8">
      <p>© {new Date().getFullYear()} Microsoft Services Price Calculator - Demo Application</p>
    </footer>
  );
};

export default Footer;