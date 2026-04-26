import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-10 bg-canvas">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-10 h-[1px] bg-primary"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Zapytania</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-12 text-primary">
              Napisz <br /> do Nas
            </h2>
            
            <div className="space-y-10 mb-16">
              {[
                { label: 'Biuro', value: 'ul. Górna 7, 41-608 Świętochłowice' },
                { label: 'Rezerwacje', value: '+48 512 292 332' },
                { label: 'Kontakt', value: 'Intermo@Intermo.eu' }
              ].map(item => (
                <div key={item.label}>
                  <h4 className="text-[9px] uppercase tracking-widest font-bold text-muted mb-2">{item.label}</h4>
                  <p className="text-xl font-serif italic">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-8 opacity-40">
              <a href="#" className="hover:opacity-100 transition-opacity"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:opacity-100 transition-opacity"><Facebook className="w-5 h-5" /></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-12 border border-border"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted">Imię i Nazwisko</label>
                  <input 
                    type="text" 
                    className="w-full border-b border-border py-2 focus:border-primary outline-none transition-colors px-0 bg-transparent rounded-none text-sm italic font-serif"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted">Adres Email</label>
                  <input 
                    type="email" 
                    className="w-full border-b border-border py-2 focus:border-primary outline-none transition-colors px-0 bg-transparent rounded-none text-sm italic font-serif"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted">Temat</label>
                <input 
                  type="text" 
                  className="w-full border-b border-border py-2 focus:border-primary outline-none transition-colors px-0 bg-transparent rounded-none text-sm italic font-serif"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted">Wiadomość</label>
                <textarea 
                  rows={4}
                  className="w-full border border-border p-4 focus:border-primary outline-none transition-colors bg-transparent resize-none rounded-none text-sm italic font-serif"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-5 text-[11px] uppercase tracking-widest hover:bg-black transition-colors"
              >
                Wyślij Wiadomość
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
