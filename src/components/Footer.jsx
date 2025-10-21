// components/Footer.jsx

import React from 'react';

const socials = [];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-raven-dark text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-5">
        <div>
          <p className="text-sm text-raven-blue font-bold mb-2">Veteran-Owned Small Business</p>
        </div>

        <div className="flex justify-center gap-6 text-sm">
          <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white">Services</a>
          <a href="#industries" onClick={(e) => { e.preventDefault(); document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white">Industries</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white">About</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white">Contact</a>
          <a href="#privacy" className="hover:text-white" aria-disabled>Privacy</a>
          <a href="#terms" className="hover:text-white" aria-disabled>Terms</a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-2">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              aria-label={social.name}
            >
              {social.icon}
              <span className="sr-only">{social.name}</span>
            </a>
          ))}
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold text-lg text-white">© {currentYear} RAV DevOps</p>
          
        </div>
      </div>
      <div className="mt-6 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
        Contracting-ready for federal, state, and enterprise engagements.
      </div>
    </footer>
  );
};

export default Footer;
