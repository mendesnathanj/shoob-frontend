import Modal from '@/components/ui/Modal';
import { useModal } from '@/hooks/useModal';

export default function ModalProvider({ children }: React.PropsWithChildren<any>) {
  const { content, isOpen, closeModal } = useModal();

  return (
    <>
      {children}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {content}
      </Modal>
    </>
  );
}
