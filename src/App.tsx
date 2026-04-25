/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from 'motion/react';
import { useState } from 'react';
import { Phone } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Apartments from './components/Apartments';
import Location from './components/Location';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PhoneModal from './components/PhoneModal';

export default function App() {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-primary z-[60] origin-left" 
        style={{ scaleX }} 
      />

      <Navbar />
      
      <main>
        <Hero />
        
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 1 }}
           viewport={{ once: true }}
        >
          <Apartments />
          <Location />
          <Gallery />
          <Booking />
          <Contact />
        </motion.div>
      </main>

      <Footer />

      {/* Floating Phone Trigger */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPhoneModalOpen(true)}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-primary text-white flex items-center justify-center shadow-2xl hover:bg-black transition-colors"
      >
        <Phone className="w-5 h-5" />
      </motion.button>

      <PhoneModal isOpen={isPhoneModalOpen} onClose={() => setIsPhoneModalOpen(false)} />
    </div>
  );
}
