import { X, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhoneModal({ isOpen, onClose }: PhoneModalProps) {
  const phoneNumber = "+48 512 292 332";
  const rawNumber = "+48512292332";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-canvas/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white border border-border w-full max-w-md p-10 relative shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-muted hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-canvas flex items-center justify-center mx-auto mb-6">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted mb-2">Kontakt Bezpośredni</h3>
              <h2 className="text-3xl font-serif text-primary mb-8">{phoneNumber}</h2>
              
              <div className="flex flex-col gap-3">
                <a 
                  href={`tel:${rawNumber}`}
                  className="w-full py-4 bg-primary text-white text-[11px] uppercase tracking-widest font-bold hover:bg-black transition-colors flex items-center justify-center gap-3"
                >
                  <Phone className="w-4 h-4" />
                  Zadzwoń Teraz
                </a>
                <a 
                  href={`https://wa.me/${rawNumber.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 border border-border text-primary text-[11px] uppercase tracking-widest font-bold hover:bg-canvas transition-colors flex items-center justify-center gap-3"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
              
              <p className="mt-8 text-[10px] text-muted uppercase tracking-widest leading-relaxed">
                Nasz concierge jest dostępny <br /> od poniedziałku do piątku 9:00 - 18:00
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
