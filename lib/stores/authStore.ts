'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'student' | 'parent' | 'tutor' | 'admin';

interface AuthState {
  isLoggedIn: boolean;
  role: Role | null;
  name: string;
  login: (role: Role, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      role: null,
      name: '',

      login: (role: Role, name: string) => {
        set({ isLoggedIn: true, role, name });
      },

      logout: () => {
        set({ isLoggedIn: false, role: null, name: '' });
      },
    }),
    {
      name: 'mathpoint-auth',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
