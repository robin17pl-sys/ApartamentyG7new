import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TermsOfService({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-canvas/90 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white border border-border w-full max-w-2xl max-h-[80vh] overflow-y-auto p-12 relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-muted hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="prose prose-sm max-w-none">
              <h2 className="text-2xl font-serif text-primary mb-8">Regulamin Serwisu</h2>
              
              <div className="space-y-6 text-muted leading-relaxed">
                <section>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">1. Postanowienia Ogólne</h3>
                  <p>Niniejszy regulamin określa zasady korzystania z systemu rezerwacyjnego Aparthotelu Intermo Górna 7.</p>
                </section>

                <section>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">2. Zasady Rezerwacji</h3>
                  <p>Rezerwacja apartamentu następuje poprzez formularz na stronie lub kontakt telefoniczny. Potwierdzenie rezerwacji wymaga wpłaty zadatku w określonym terminie.</p>
                </section>

                <section>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">3. Odwołanie Rezerwacji</h3>
                  <p>Zasady anulowania rezerwacji są określane indywidualnie dla każdej oferty. Standardowo bezkosztowe anulowanie jest możliwe do 7 dni przed przyjazdem.</p>
                </section>

                <section>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">4. Odpowiedzialność Gości</h3>
                  <p>Goście ponoszą pełną odpowiedzialność materialną za wszelkie uszkodzenia lub zniszczenia przedmiotów wyposażenia i urządzeń technicznych powstałe z ich winy.</p>
                </section>

                <section>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">5. Reklamacje</h3>
                  <p>Wszelkie reklamacje dotyczące świadczonych usług można zgłaszać drogą mailową na adres Intermo@Intermo.eu w terminie 14 dni od zakończenia pobytu.</p>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
