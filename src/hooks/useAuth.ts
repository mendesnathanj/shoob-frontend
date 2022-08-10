import create from 'zustand';
import { PersistedSpraypaintRecord } from 'spraypaint';
import { User } from '@/models/v2';

interface UseAuth {
  user?: PersistedSpraypaintRecord<User> | null;
  setUser: (user?: PersistedSpraypaintRecord<User> | null) => void;
}

export const useAuth = create<UseAuth>((set) => ({
  setUser: (user) => set(() => ({ user })),
  user: null,
}));
