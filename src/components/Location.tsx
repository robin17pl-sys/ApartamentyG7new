import { motion } from 'motion/react';
import { Leaf, Wind, Sun, Coffee } from 'lucide-react';

const locationFeatures = [
  {
    icon: Leaf,
    title: 'Zielona Enklawa',
    description: 'Budynek znajduje się w pierwszej linii zabudowy od największego parku w mieście.'
  },
  {
    icon: Wind,
    title: 'Świeże Powietrze',
    description: 'System filtracji powietrza w każdym apartamencie oraz bliskość natury.'
  },
  {
    icon: Sun,
    title: 'Naturalne Światło',
    description: 'Północno-południowa ekspozycja i wysokie okna dla idealnego doświetlenia.'
  },
  {
    icon: Coffee,
    title: 'Lokalne Kawiarnie',
    description: 'Tylko 5 minut spacerem do najlepszych kawiarni i restauracji w okolicy.'
  }
];

export default function Location() {
  return (
    <section id="location" className="py-20 sm:py-32 px-6 sm:px-10 bg-canvas overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6 text-muted">
              <span className="w-8 sm:w-10 h-[1px] bg-muted"></span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold">Otoczenie</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-primary font-serif mb-8 sm:mb-10 leading-tight">Pierwsza Linia <br className="hidden sm:block" /> Natury</h2>
            <p className="text-muted text-base sm:text-lg mb-12 sm:mb-16 leading-relaxed italic font-serif">
               Rzadkie połączenie wielkomiejskiego życia z ciszą natury, oferowane wyłącznie dzięki naszemu bezpośredniemu sąsiedztwu z centralnym parkiem.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
              {locationFeatures.map((item, i) => (
                <div key={i} className="border-l border-border pl-6 py-2">
                  <div className="text-[10px] uppercase tracking-widest text-muted mb-2 font-bold">{item.title}</div>
                  <p className="text-primary text-xs leading-relaxed font-medium">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[16/10] bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1540333032555-0373a4b6f4b6?auto=format&fit=crop&q=80&w=1968" 
                alt="Green Park Area" 
                className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary p-6 flex flex-col justify-center text-white shadow-2xl">
                <span className="text-4xl font-serif mb-2">07</span>
                <p className="text-[9px] uppercase tracking-[0.2em] opacity-70">ul. Górna 7, 41-608 Świętochłowice</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
