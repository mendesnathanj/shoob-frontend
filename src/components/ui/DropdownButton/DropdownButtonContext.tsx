import React, { createContext, useMemo, useState } from 'react';

export type DropdownButtonContextType = {
  open: boolean;
  setOpen: (nextState: boolean) => void;
  toggle: () => void;
};

export const DropdownButtonContext = createContext<DropdownButtonContextType>({} as DropdownButtonContextType);

export function DropdownButtonContextProvider({ children }: React.PropsWithChildren<{}>) {
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
