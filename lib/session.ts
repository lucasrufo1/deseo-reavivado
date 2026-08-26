/**
 * session.ts — Client-side session, with no backend.
 *
 * Uses Zustand + the `persist` middleware to keep the session in localStorage.
 * In this phase auth is purely local: submitting a valid email "logs in".
 * Real auth (magic link) arrives in a later phase — see docs/ROADMAP.md.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  email: string | null;
  isAuthenticated: boolean;
  /** Whether the persisted store has finished rehydrating from localStorage. */
  hasHydrated: boolean;
  login: (email: string) => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      email: null,
      isAuthenticated: false,
      hasHydrated: false,
      login: (email) => set({ email: email.trim(), isAuthenticated: true }),
      logout: () => set({ email: null, isAuthenticated: false }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "deckapp-session",
      // Only persist the actual session data, not the hydration flag.
      partialize: (state) => ({
        email: state.email,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
