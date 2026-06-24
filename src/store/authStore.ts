import { create } from 'zustand';
import type { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setAdmin: (isAdmin: boolean) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

// বিল্ড এরর এড়াতে Explicit Type ব্যবহার করা হয়েছে
export const useAuthStore = create<AuthState>((set: any) => ({
  user: null,
  isAdmin: false,
  loading: true,

  setUser: (user: User | null) => set({ user }),
  setAdmin: (isAdmin: boolean) => set({ isAdmin }),
  setLoading: (loading: boolean) => set({ loading }),
  logout: () => set({ user: null, isAdmin: false, loading: false }),
}));