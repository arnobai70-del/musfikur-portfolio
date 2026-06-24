import { create } from 'zustand';
import { User } from 'firebase/auth';

// অথেন্টিকেশন স্টেটের টাইপ ডিফিনিশন
interface AuthState {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setAdmin: (isAdmin: boolean) => void;
  logout: () => void;
}

// Zustand স্টোর তৈরি
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true, // শুরুতে লোডিং ট্রু থাকবে যতক্ষণ না ফায়ারবেস চেক শেষ হয়
  isAdmin: false,
  
  // ইউজার সেট করার ফাংশন
  setUser: (user) => set({ user, loading: false }),
  
  // লোডিং স্টেট পরিবর্তন করার ফাংশন
  setLoading: (loading) => set({ loading }),
  
  // অ্যাডমিন স্ট্যাটাস সেট করার ফাংশন
  setAdmin: (isAdmin) => set({ isAdmin }),
  
  // লগআউট করার সময় স্টেট ক্লিয়ার করার ফাংশন
  logout: () => set({ user: null, isAdmin: false, loading: false }),
}));