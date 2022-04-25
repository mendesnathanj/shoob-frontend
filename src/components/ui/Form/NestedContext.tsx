import { createContext, useContext, useMemo } from 'react';
import { ChildrenProps } from '../../../types';

type NestedContextType = {
  index: number;
  scope: string;
}

export const NestedContext = createContext<NestedContextType>({} as NestedContextType);

type useNestedNameProps = {
  name: string;
};

export const useNestedName = ({ name }: useNestedNameProps) => {
  const { index, scope } = useContext(NestedContext);

  return `${scope || ''}${index !== undefined ? `.${index}.` : ''}${name}`;
};

type NestedContextProviderProps = NestedContextType & ChildrenProps;

export function NestedContextProvider({ children, index, scope }: NestedContextProviderProps) {
  const value = useMemo(() => ({ index, scope }), [index, scope]);

  return (
    <NestedContext.Provider value={value}>
      {children}
    </NestedContext.Provider>
  );
}
