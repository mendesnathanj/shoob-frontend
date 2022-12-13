import Modal from '@/components/ui/Modal';
import { useModal } from '@/hooks/useModal';

export default function ModalWrapper() {
  const { content, header, isOpen, closeModal, onSubmit, submitText } = useModal();

  return (
    <Modal
      header={header}
      isOpen={isOpen}
      closeModal={closeModal}
      onSubmit={onSubmit}
      submitText={submitText}
    >
      {content}
    </Modal>
  );
}
