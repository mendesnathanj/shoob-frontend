import create from 'zustand';

export interface UseModal {
  content: React.ReactNode;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setContent: (newContent: React.ReactNode) => void;
  toggleModal: () => void;
}

export const useModal = create<UseModal>((set) => ({
  content: null,
  isOpen: false,
  closeModal: () => set((state) => ({ ...state, isOpen: false, content: null })),
  openModal: () => set((state) => ({ ...state, isOpen: true })),
  setContent: (newContent) => set((state) => ({ ...state, content: newContent })),
  toggleModal: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
}));
