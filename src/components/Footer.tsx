import { Landmark, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className="bg-canvas pt-32 pb-12 px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-24">
          <div className="space-y-1">
            <h1 className="text-[10px] uppercase tracking-[0.3em] font-semibold text-muted">Apartamenty Premium</h1>
            <div className="text-3xl font-serif text-primary">INTERMO GÓRNA 7</div>
          </div>
          <div className="flex gap-4 opacity-30">
            <Instagram className="w-5 h-5" />
            <Facebook className="w-5 h-5" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start pb-20">
          <div className="md:col-span-6 flex gap-20">
            <div>
              <h4 className="text-[9px] uppercase tracking-widest font-bold text-muted mb-8 italic">Katalog</h4>
               <ul className="space-y-4">
                {['Apartamenty', 'Udogodnienia', 'Galeria', 'Concierge', 'Lokalizacja'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-[11px] uppercase tracking-[0.2em] font-medium text-primary hover:text-muted transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-widest font-bold text-muted mb-8 italic">Kontakt</h4>
              <ul className="space-y-4 text-xs font-serif italic text-primary">
                <li>+48 512 292 332</li>
                <li>Intermo@Intermo.eu</li>
                <li>ul. Górna 7, 41-608 Świętochłowice</li>
              </ul>
            </div>
          </div>
          
          <div id="lokalizacja" className="md:col-span-6 border-l border-border pl-10 h-full">
             <h4 className="text-[9px] uppercase tracking-widest font-bold text-muted mb-6 italic">Lokalizacja</h4>
              <div className="w-full h-64 bg-neutral-100 grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden">
               <iframe 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }}
                 src="https://maps.google.com/maps?q=ul.%20G%C3%B3rna%207%2C%20%C5%9Awi%C4%99toch%C5%82owice&t=&z=15&ie=UTF8&iwloc=&output=embed"
                 allowFullScreen
                 loading="lazy"
               ></iframe>
             </div>
          </div>
        </div>

        <div className="pt-10 border-t border-border flex justify-between items-center text-[9px] text-muted uppercase tracking-[0.3em] font-bold">
          <div>© 2026 Intermo Górna 7</div>
          <div className="flex gap-10">
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-primary transition-colors cursor-pointer">Prywatność</button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-primary transition-colors cursor-pointer">Regulamin</button>
          </div>
        </div>
      </div>

      <PrivacyPolicy isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsOfService isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </footer>
  );
}
