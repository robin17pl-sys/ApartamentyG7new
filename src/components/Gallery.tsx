import { motion } from 'motion/react';

const photos = [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1980',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=2074',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=2070',
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-10 bg-canvas">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 text-muted mx-auto">
            <span className="w-6 h-[1px] bg-muted"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Dziennik Wizualny</span>
            <span className="w-6 h-[1px] bg-muted"></span>
          </div>
          <h2 className="text-4xl md:text-5xl text-primary font-serif">Atmosferyczne Przestrzenie</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[350px]">
          {photos.map((url, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className={`relative overflow-hidden group bg-neutral-200 ${
                i === 0 ? 'md:col-span-8' : 
                i === 1 ? 'md:col-span-4' : 
                i === 2 ? 'md:col-span-4' : 
                i === 3 ? 'md:col-span-4' : 
                i === 4 ? 'md:col-span-4' : 
                'md:col-span-12'
              }`}
            >
              <img 
                src={url} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
