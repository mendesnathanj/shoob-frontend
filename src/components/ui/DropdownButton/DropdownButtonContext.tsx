import { createContext, useMemo, useState } from 'react';

export type DropdownButtonContextType = {
  open: boolean;
  setOpen: (nextState: boolean) => void;
  toggle: () => void;
};

export const DropdownButtonContext = createContext<DropdownButtonContextType>({} as DropdownButtonContextType);

type ContextProviderProps = {
  children: React.ReactNode
};

export function DropdownButtonContextProvider({ children }: ContextProviderProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const value = useMemo(() => ({
    open, setOpen, toggle
  }), [open]);

  return (
    <DropdownButtonContext.Provider value={value}>
      {children}
    </DropdownButtonContext.Provider>
  );
}
