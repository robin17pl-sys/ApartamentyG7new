/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Phone, LayoutDashboard } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Apartments from './components/Apartments';
import Location from './components/Location';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PhoneModal from './components/PhoneModal';
import CRM from './components/CRM';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isCRMOpen, setIsCRMOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

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

      {/* Floating Actions */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        {isAuthenticated && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCRMOpen(true)}
            className="w-14 h-14 bg-white border border-border text-primary flex items-center justify-center shadow-xl hover:bg-canvas transition-colors"
            title="Panel Klienta / CRM"
          >
            <LayoutDashboard className="w-5 h-5" />
          </motion.button>
        )}

        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPhoneModalOpen(true)}
          className="w-14 h-14 bg-primary text-white flex items-center justify-center shadow-2xl hover:bg-black transition-colors"
          title="Kontakt telefoniczny"
        >
          <Phone className="w-5 h-5" />
        </motion.button>
      </div>

      <PhoneModal isOpen={isPhoneModalOpen} onClose={() => setIsPhoneModalOpen(false)} />
      
      <AnimatePresence>
        {isCRMOpen && <CRM onClose={() => setIsCRMOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
