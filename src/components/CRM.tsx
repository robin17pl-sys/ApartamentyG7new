import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Calendar as CalendarIcon, Check, X, Loader2, LogOut, ChevronRight } from 'lucide-react';
import { db, auth, logout } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';

export default function CRM({ onClose }: { onClose: () => void }) {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Check if user is admin
    const checkAdmin = async () => {
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (adminDoc.exists()) {
        setIsAdmin(true);
      }
    };
    checkAdmin();

    const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const resData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(resData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status });
    } catch (error) {
      console.error("Update status error:", error);
      alert("Tylko administratorzy mogą zmieniać status.");
    }
  };

  if (!auth.currentUser) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-canvas flex flex-col"
    >
      <nav className="h-20 border-b border-border px-10 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <LayoutDashboard className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-serif text-primary">Panel Zarządzania</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted">Zalogowany jako</p>
            <p className="text-xs font-serif italic text-primary">{auth.currentUser.email}</p>
          </div>
          <button 
            onClick={() => { logout(); onClose(); }}
            className="p-2 hover:bg-canvas rounded-full transition-colors text-muted hover:text-primary"
            title="Wyloguj"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-border text-[10px] uppercase tracking-widest hover:bg-canvas transition-colors"
          >
            Zamknij
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto p-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-serif text-primary mb-2">Rezerwacje</h3>
              <p className="text-muted text-sm italic font-serif">Zarządzaj zapytaniami o pobyt w Intermo Górna 7.</p>
            </div>
            <div className="flex gap-4">
               <div className="bg-white border border-border px-6 py-3 text-center">
                 <p className="text-[10px] uppercase tracking-widest text-muted mb-1">Wszystkie</p>
                 <p className="text-xl font-serif">{reservations.length}</p>
               </div>
               <div className="bg-white border border-border px-6 py-3 text-center">
                 <p className="text-[10px] uppercase tracking-widest text-muted mb-1">Oczekujące</p>
                 <p className="text-xl font-serif text-amber-600">{reservations.filter(r => r.status === 'pending').length}</p>
               </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-muted" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {reservations.map((res) => (
                <motion.div 
                  key={res.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-border p-8 flex flex-col md:flex-row justify-between items-start md:items-center group hover:border-primary transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className={`w-2 h-2 rounded-full ${
                         res.status === 'confirmed' ? 'bg-green-500' : 
                         res.status === 'cancelled' ? 'bg-red-500' : 'bg-amber-500'
                       }`}></span>
                       <span className="text-[10px] uppercase tracking-widest font-bold text-muted">
                         ID: {res.id.slice(-6)} • {res.status === 'pending' ? 'Oczekuje' : res.status === 'confirmed' ? 'Potwierdzona' : 'Anulowana'}
                       </span>
                    </div>
                    <h4 className="text-xl font-serif text-primary mb-4">{res.apartmentName}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                       <div>
                         <p className="text-[9px] uppercase tracking-widest text-muted mb-1">Gość</p>
                         <p className="text-sm font-serif italic text-primary">{res.customerName}</p>
                       </div>
                       <div>
                         <p className="text-[9px] uppercase tracking-widest text-muted mb-1">Termin</p>
                         <p className="text-sm font-serif italic text-primary">{res.checkIn} — {res.checkOut}</p>
                       </div>
                       <div>
                         <p className="text-[9px] uppercase tracking-widest text-muted mb-1">Osoby</p>
                         <p className="text-sm font-serif italic text-primary">{res.guests}</p>
                       </div>
                       <div>
                         <p className="text-[9px] uppercase tracking-widest text-muted mb-1">E-mail</p>
                         <p className="text-sm font-serif italic text-primary">{res.customerEmail}</p>
                       </div>
                    </div>
                  </div>

                  {isAdmin && res.status === 'pending' && (
                    <div className="flex gap-2 mt-6 md:mt-0 md:ml-10">
                      <button 
                        onClick={() => updateStatus(res.id, 'confirmed')}
                        className="bg-primary text-white p-3 hover:bg-black transition-colors"
                        title="Potwierdź"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => updateStatus(res.id, 'cancelled')}
                        className="border border-border text-primary p-3 hover:bg-canvas transition-colors"
                        title="Anuluj"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {reservations.length === 0 && (
                <div className="text-center py-20 border border-dashed border-border">
                  <p className="text-muted font-serif italic">Brak rezerwacji do wyświetlenia.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
}
