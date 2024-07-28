import React from 'react';
import '../../sass/navigation.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© {currentYear} Your Travel Company</p>
      </div>
    </footer>
  );
};

export default Footer;