import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Home, CheckCircle2, Loader2 } from 'lucide-react';
import { db, auth, loginWithGoogle } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Booking() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [apartment, setApartment] = useState('Apartament Nr 1');
  const [guests, setGuests] = useState('1 Gość');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let user = auth.currentUser;
      if (!user) {
        user = await loginWithGoogle();
      }

      const reservationData = {
        apartmentId: apartment.split(' ').pop() || '1',
        apartmentName: apartment,
        checkIn,
        checkOut,
        guests,
        status: 'pending',
        userId: user.uid,
        createdAt: serverTimestamp(),
        customerName: user.displayName || 'Anonim',
        customerEmail: user.email || ''
      };

      await addDoc(collection(db, 'reservations'), reservationData);
      
      // Notify Admin via Email
      try {
        await fetch('/api/notify-admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reservationData)
        });
      } catch (e) {
        console.error("Email notification failed", e);
      }
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Wystąpił błąd podczas rezerwacji. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-32 px-10 bg-canvas">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-12 shadow-sm border border-border relative overflow-hidden">
          
          <div className="relative z-10 text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 text-muted mx-auto">
              <span className="w-6 h-[1px] bg-muted"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Rezerwacje</span>
              <span className="w-6 h-[1px] bg-muted"></span>
            </div>
            <h2 className="text-4xl font-serif text-primary">Sprawdź Dostępność</h2>
          </div>

          {success && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-12 text-center"
            >
              <div className="w-16 h-16 border border-border flex items-center justify-center mb-8">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-serif italic text-primary mb-4">Zapytanie Wysłane</h3>
              <p className="text-muted text-sm max-w-xs mx-auto italic font-serif leading-relaxed">
                Potwierdzenia są przygotowywane osobiście i wysyłane w ciągu godziny.
              </p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-12 text-primary uppercase tracking-[0.2em] text-[10px] font-bold border-b border-primary hover:text-muted hover:border-muted transition-all"
              >
                Powrót do wyboru
              </button>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted">Przyjazd</label>
                <input 
                  type="date" 
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent p-0 pb-2 text-sm border-b border-border focus:border-primary outline-none transition-colors rounded-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted">Wyjazd</label>
                <input 
                  type="date" 
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent p-0 pb-2 text-sm border-b border-border focus:border-primary outline-none transition-colors rounded-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted">Wybierz Apartament</label>
                <select 
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full bg-transparent p-0 pb-2 text-sm border-b border-border focus:border-primary outline-none appearance-none rounded-none cursor-pointer"
                >
                  <option>Apartament Nr 1</option>
                  <option>Apartament Nr 2</option>
                  <option>Apartament Nr 3</option>
                  <option>Apartament Nr 4</option>
                  <option>Apartament Nr 5</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted">Goście</label>
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent p-0 pb-2 text-sm border-b border-border focus:border-primary outline-none appearance-none rounded-none cursor-pointer"
                >
                  <option>1 Gość</option>
                  <option>2 Gości</option>
                  <option>3 Gości</option>
                  <option>4 Gości i więcej...</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-primary text-white uppercase tracking-[0.4em] font-medium text-[11px] hover:bg-black transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Wysyłanie...
                </>
              ) : (
                'Zapytaj o Pobyt'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
