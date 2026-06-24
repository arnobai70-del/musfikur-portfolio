import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { setUser, setLoading, setAdmin } = useAuthStore();

  useEffect(() => {
    // ফায়ারবেস অথেন্টিকেশন স্টেট লিসেনার
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // যদি ইউজার লগইন থাকে
        setUser(user);
        
        // এখানে আপনি আপনার ইমেইল চেক করে অ্যাডমিন স্ট্যাটাস সেট করতে পারেন
        // উদাহরণস্বরূপ: আপনার নির্দিষ্ট ইমেইলটি অ্যাডমিন হিসেবে গণ্য হবে
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

    // ক্লিনআপ ফাংশন: যখন কম্পোনেন্ট আনমাউন্ট হবে তখন লিসেনার বন্ধ করে দিবে
    return () => unsubscribe();
  }, [setUser, setLoading, setAdmin]);
};