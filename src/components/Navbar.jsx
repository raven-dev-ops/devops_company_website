import React, { useState } from 'react';

const Navbar = ({ onNavigate, onBookConsultation, onRequestDemo, onJoinRetainer }) => {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    onNavigate && onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <button
          onClick={() => go('hero')}
          className="text-raven-dark font-extrabold text-lg tracking-tight"
          aria-label="Go to home"
        >
          RAV DevOps
        </button>
        <div className="hidden md:flex items-center gap-6">
          <button className="text-gray-700 hover:text-raven-blue" onClick={() => go('services')}>Services</button>
          <button className="text-gray-700 hover:text-raven-blue" onClick={() => go('industries')}>Industries</button>
          <button className="text-gray-700 hover:text-raven-blue" onClick={() => go('about')}>About</button>
          <button className="text-gray-700 hover:text-raven-blue" onClick={() => go('contact')}>Contact</button>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={onBookConsultation} className="px-3 py-2 text-sm font-semibold text-white bg-raven-blue rounded-md hover:bg-blue-800">Book Consultation</button>
          <button onClick={onRequestDemo} className="px-3 py-2 text-sm font-semibold text-raven-blue border border-raven-blue rounded-md hover:bg-blue-50">Request Demo</button>
          <button onClick={onJoinRetainer} className="px-3 py-2 text-sm font-semibold text-white bg-raven-red rounded-md hover:bg-red-700">Join CI Retainer</button>
        </div>
        <button
          className="md:hidden p-2 text-gray-700 hover:text-raven-blue"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 flex flex-col gap-2">
            <button className="text-left py-2" onClick={() => go('services')}>Services</button>
            <button className="text-left py-2" onClick={() => go('industries')}>Industries</button>
            <button className="text-left py-2" onClick={() => go('about')}>About</button>
            <button className="text-left py-2" onClick={() => go('contact')}>Contact</button>
            <div className="pt-2 flex flex-col gap-2">
              <button onClick={onBookConsultation} className="w-full px-3 py-2 text-sm font-semibold text-white bg-raven-blue rounded-md">Book Consultation</button>
              <button onClick={onRequestDemo} className="w-full px-3 py-2 text-sm font-semibold text-raven-blue border border-raven-blue rounded-md">Request Demo</button>
              <button onClick={onJoinRetainer} className="w-full px-3 py-2 text-sm font-semibold text-white bg-raven-red rounded-md">Join CI Retainer</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

