import { motion } from 'motion/react';
import { Trees, ShieldCheck, Wifi, Coffee, Wind, Utensils } from 'lucide-react';

const apartments = [
  {
    id: '1',
    name: 'Apartament Nr 1',
    description: 'Najbardziej przestronny apartament z tarasem wychodzącym bezpośrednio na korony drzew.',
    size: '85m²',
    price: '950 PLN / doba',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1974',
    features: ['Panoramiczny widok', 'Prywatny taras', 'Wanna wolnostojąca']
  },
  {
    id: '2',
    name: 'Apartament Nr 2',
    description: 'Nowoczesny loft z wysokimi sufitami i minimalistycznym wystrojem w odcieniach zieleni.',
    size: '65m²',
    price: '750 PLN / doba',
    image: 'https://images.unsplash.com/photo-1600607687940-4e7a6a357d19?auto=format&fit=crop&q=80&w=2070',
    features: ['Otwarta przestrzeń', 'Smart Home', 'Widok na park']
  },
  {
    id: '3',
    name: 'Apartament Nr 3',
    description: 'Przytulne wnętrze wypełnione naturalnym światłem i roślinnością.',
    size: '55m²',
    price: '650 PLN / doba',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2070',
    features: ['Duże okna', 'Ekspres do kawy', 'Cisza i spokój']
  },
  {
    id: '4',
    name: 'Apartament Nr 4',
    description: 'Eleganckie studio idealne na wyjazdy biznesowe lub weekend we dwoje.',
    size: '45m²',
    price: '550 PLN / doba',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=2070',
    features: ['Strefa do pracy', 'Szybkie WiFi', 'Bliskość centrum']
  },
  {
    id: '5',
    name: 'Apartament Nr 5',
    description: 'Luksus i wygoda z najlepszą perspektywą na miejską zieleń.',
    size: '75m²',
    price: '850 PLN / doba',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070',
    features: ['Pełne wyposażenie', 'Klimatyzacja', 'Parking']
  },
];

export default function Apartments() {
  return (
    <section id="apartments" className="py-24 px-10 bg-canvas overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[1px] bg-primary"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Wyselekcjonowane Przestrzenie</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-primary font-serif leading-tight">
              Pięć Wyjątkowych <br /> Prywatnych Rezydencji
            </h2>
          </div>
          <p className="text-muted max-w-sm text-sm leading-relaxed italic font-serif">
            Każdy apartament został skrupulatnie dopasowany, aby zrównoważyć architektoniczną precyzję z organicznym spokojem parku.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {apartments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="relative overflow-hidden mb-8 aspect-[4/5] bg-neutral-100">
                <img 
                  src={apt.image} 
                  alt={apt.name} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-0 right-0 p-8">
                   <span className="text-[80px] font-serif opacity-5 text-white pointer-events-none">0{index + 1}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-baseline mb-4 border-b border-border pb-4">
                <h3 className="text-xl font-serif italic text-primary">{apt.name}</h3>
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted">{apt.size}</span>
              </div>
              
              <p className="text-muted text-sm mb-6 leading-relaxed italic font-serif">
                {apt.description}
              </p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 opacity-60">
                {apt.features.map(f => (
                  <span key={f} className="text-[9px] uppercase tracking-[0.1em] font-bold border-l border-border pl-3">
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                 <span className="text-xs font-serif italic">{apt.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
