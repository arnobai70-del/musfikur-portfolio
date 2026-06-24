import { create } from 'zustand';
import type { User } from 'firebase/auth';

// Define the shape of our authentication state
interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setAdmin: (isAdmin: boolean) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

// Create the store with explicit types to satisfy TypeScript strict mode
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAdmin: false,
  loading: true,

  // Explicitly typing parameters to avoid 'implicit any' errors
  setUser: (user: User | null) => set({ user }),

  setAdmin: (isAdmin: boolean) => set({ isAdmin }),

  setLoading: (loading: boolean) => set({ loading }),

  logout: () => set({ user: null, isAdmin: false, loading: false }),
}));