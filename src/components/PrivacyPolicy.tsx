import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PrivacyPolicy({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
              <h2 className="text-2xl font-serif text-primary mb-8">Polityka Prywatności</h2>
              
              <div className="space-y-6 text-muted leading-relaxed">
                <section>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">1. Informacje Ogólne</h3>
                  <p>Administratorem danych osobowych jest Intermo Górna 7 z siedzibą w Świętochłowicach. Dbamy o bezpieczeństwo Twoich danych i respektujemy Twoją prywatność.</p>
                </section>

                <section>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">2. Zakres Zbieranych Danych</h3>
                  <p>Zbieramy dane niezbędne do realizacji rezerwacji, w tym: imię, nazwisko, adres e-mail, numer telefonu oraz dane dotyczące płatności.</p>
                </section>

                <section>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">3. Cel Przetwarzania</h3>
                  <p>Twoje dane są przetwarzane w celu obsługi zapytań, realizacji umów najmu apartamentów oraz przesyłania informacji handlowych (jeśli wyrazisz na to zgodę).</p>
                </section>

                <section>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">4. Twoje Prawa</h3>
                  <p>Masz prawo do wglądu w swoje dane, ich poprawiania, usunięcia lub ograniczenia przetwarzania. Możesz również wycofać zgodę na przetwarzanie danych w dowolnym momencie.</p>
                </section>

                <section>
                  <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">5. Cookies</h3>
                  <p>Nasza strona wykorzystuje pliki cookies w celu zapewnienia najlepszej jakości usług i celach statystycznych.</p>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
