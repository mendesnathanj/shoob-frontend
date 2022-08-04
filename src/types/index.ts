import React from 'react';

export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : (T[P] | undefined);
}

export type ChildrenProps = {
  children: React.ReactNode;
}

export type ProviderProps = ChildrenProps;
