import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Budget, Interest } from '../data/events';

type Prefs = {
  city: string;
  interests: Interest[];
  budget: Budget;
  showFree: boolean;
};

type AppState = Prefs & {
  onboarded: boolean;
  email: string;
  saved: string[];
  setCity: (c: string) => void;
  toggleInterest: (i: Interest) => void;
  setBudget: (b: Budget) => void;
  setShowFree: (v: boolean) => void;
  setEmail: (e: string) => void;
  completeOnboarding: () => void;
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
};

const STORAGE_KEY = 'yeahzy:v1';

const defaults = {
  city: 'London',
  interests: [] as Interest[],
  budget: 'under25' as Budget,
  showFree: true,
  onboarded: false,
  email: '',
  saved: [] as string[],
};

function load(): typeof defaults {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable: keep in memory */
    }
  }, [state]);

  const value = useMemo<AppState>(
    () => ({
      ...state,
      setCity: (city) => setState((s) => ({ ...s, city })),
      toggleInterest: (i) =>
        setState((s) => ({
          ...s,
          interests: s.interests.includes(i) ? s.interests.filter((x) => x !== i) : [...s.interests, i],
        })),
      setBudget: (budget) => setState((s) => ({ ...s, budget })),
      setShowFree: (showFree) => setState((s) => ({ ...s, showFree })),
      setEmail: (email) => setState((s) => ({ ...s, email })),
      completeOnboarding: () => setState((s) => ({ ...s, onboarded: true })),
      isSaved: (id) => state.saved.includes(id),
      toggleSaved: (id) =>
        setState((s) => ({
          ...s,
          saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id],
        })),
    }),
    [state],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider');
  return ctx;
}
