import { motion } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import PhoneModal from './PhoneModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Apartamenty', href: '#apartments' },
    { name: 'Udogodnienia', href: '#location' },
    { name: 'Galeria', href: '#gallery' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-canvas/95 backdrop-blur-md py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-end border-b border-border pb-4">
        <motion.a 
          href="#" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-0 group"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-muted">Apartamenty Premium</span>
          <span className="text-2xl font-serif text-primary leading-tight">
            INTERMO GÓRNA 7
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-primary hover:text-muted transition-colors luxury-underline"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsPhoneModalOpen(true)}
              className="text-primary hover:text-muted transition-colors"
              title="Zadzwoń do nas"
            >
              <Phone className="w-4 h-4" />
            </button>
            <a 
              href="#booking"
              className="px-6 py-2 bg-primary text-white text-[11px] uppercase tracking-widest hover:bg-black transition-colors"
            >
              Rezerwacja
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setIsPhoneModalOpen(true)}
            className="text-primary p-2"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button 
            className="text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden bg-canvas overflow-hidden border-b border-border"
      >
        <div className="flex flex-col p-10 gap-6 text-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xs uppercase tracking-widest text-primary hover:text-muted"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#booking"
            onClick={() => setIsOpen(false)}
            className="px-6 py-4 bg-primary text-white text-[11px] uppercase tracking-widest hover:bg-black transition-colors"
          >
            Zarezerwuj Pobyt
          </a>
        </div>
      </motion.div>

      <PhoneModal isOpen={isPhoneModalOpen} onClose={() => setIsPhoneModalOpen(false)} />
    </nav>
  );
}
