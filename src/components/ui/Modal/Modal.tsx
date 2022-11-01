import { useState } from 'react';
import ReactModal from 'react-modal';
import Button from '../Button';

ReactModal.setAppElement('#modal-container');

type useModalProps = {
  initialState?: boolean;
};

const DEFAULT_USE_MODAL_PROPS: useModalProps = {
  initialState: false,
};

export function useModal({ initialState = false }: useModalProps = DEFAULT_USE_MODAL_PROPS) {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  return { closeModal, isOpen, openModal, toggleModal };
}

type ModalProps = {
  children: React.ReactNode;
} & Omit<ReturnType<typeof useModal>, 'toggleModal' | 'openModal'>;

export default function Modal({ children, closeModal, isOpen }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
    >
      <div>
        <Button onClick={closeModal}>Close</Button>
      </div>
      <div>
        {children}
      </div>
    </ReactModal>
  );
}
