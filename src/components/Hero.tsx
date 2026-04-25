import { motion } from 'motion/react';
import { MousePointer2, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center pt-24 px-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="col-span-12 lg:col-span-5 z-10"
        >
          <div className="flex items-center gap-2 mb-8">
            <span className="w-10 h-[1px] bg-primary"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Nasza Koncepcja</span>
          </div>
          <h1 className="text-5xl md:text-7xl text-primary font-serif mb-10 leading-[1.1]">
            Niezakłócony <br /> Widok na Park
          </h1>
          <p className="text-muted text-lg md:text-xl italic font-serif leading-relaxed mb-12 max-w-md">
            Doświadcz wyrafinowanego życia w siedmiu starannie zaprojektowanych apartamentach, gdzie architektoniczna precyzja spotyka się z kojącym spokojem natury.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#apartments"
              className="px-10 py-5 bg-primary text-white uppercase tracking-widest text-[11px] hover:bg-black transition-colors text-center"
            >
              Poznaj Apartamenty
            </a>
          </div>
        </motion.div>

        {/* Right Image Feature */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="col-span-12 lg:col-span-7 relative group h-[500px] lg:h-[600px]"
        >
          <div className="absolute inset-0 bg-neutral-200 overflow-hidden rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070" 
              alt="Luxury Apartment View" 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
              <span className="text-white opacity-10 text-[20vw] font-serif select-none leading-none">01</span>
            </div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-muted p-4 flex flex-col justify-center items-center text-white text-center shadow-xl">
            <span className="text-3xl font-serif">7</span>
            <span className="text-[9px] uppercase tracking-widest opacity-70">GÓRNA</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-10 text-muted flex flex-col items-start gap-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-primary">2 Suites Available</span>
        </div>
      </motion.div>
    </section>
  );
}
