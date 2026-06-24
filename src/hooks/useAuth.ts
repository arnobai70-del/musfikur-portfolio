import { useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuthStore } from '../store/authStore';

export const useAuth = (): void => {
  const { setUser, setLoading, setAdmin } = useAuthStore();

  useEffect(() => {
    // ফায়ারবেস অথেন্টিকেশন স্টেট লিসেনার
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // যদি ইউজার লগইন থাকে
        setUser(user);
        
        // অ্যাডমিন ইমেইল চেক
        if (user.email === 'contact@musfikurrahmanarnob.dev') {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } else {
        // যদি ইউজার লগআউট থাকে
        setUser(null);
        setAdmin(false);
      }
      
      // চেক শেষ হলে লোডিং বন্ধ হবে
      setLoading(false);
    });

    // ক্লিনআপ ফাংশন
    return () => unsubscribe();
  }, [setUser, setLoading, setAdmin]);
};