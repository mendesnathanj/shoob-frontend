import create from 'zustand';
import React from 'react';

export interface UseModal {
  content: React.ReactNode;
  header: React.ReactNode;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setContent: (newContent: React.ReactNode) => void;
  setHeader: (newHeader: React.ReactNode) => void;
  setSubmitText: (newText: React.ReactNode) => void;
  setOnSubmit: (newCallback: () => any) => void;
  onSubmit?: () => any;
  submitText: React.ReactNode;
  toggleModal: () => void;
}

export const useModal = create<UseModal>((set) => ({
  content: null,
  header: null,
  isOpen: false,
  closeModal: () => set((state) => {
    document.body.style.overflow = 'auto';
    return { ...state, isOpen: false, content: null, header: null, submitText: 'Submit' };
  }),
  openModal: () => set((state) => {
    document.body.style.overflow = 'hidden';
    return { ...state, isOpen: true };
  }),
  setContent: (newContent) => set((state) => ({ ...state, content: newContent })),
  setHeader: (newHeader) => set((state) => ({ ...state, header: newHeader })),
  setSubmitText: (newText) => set((state) => ({ ...state, submitText: newText })),
  setOnSubmit: (newCallback) => set((state) => ({ ...state, onSubmit: newCallback })),
  onSubmit: undefined,
  submitText: 'Submit',
  toggleModal: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
}));
