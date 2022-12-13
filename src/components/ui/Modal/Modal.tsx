import ReactModal from 'react-modal';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

ReactModal.setAppElement('#modal-container');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }
};

type ModalProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  closeModal: () => void;
  isOpen: boolean;
  submitText: React.ReactNode;
  onSubmit?: () => void;
};

export default function Modal({ children, closeModal, header, isOpen, onSubmit, submitText }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
    >
      <div className="flex justify-between items-center py-2">
        <span className="text-2xl font-bold">{header}</span>
        <button
          className="flex items-center justify-center w-8 h-8 text-xl rounded-full hover:bg-gray-200 transition-all"
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div>
        {children}
      </div>
      {onSubmit && (
        <div className="flex justify-end py-4">
          <Button variant="primary" onClick={onSubmit}>
            {submitText}
          </Button>
        </div>
      )}
    </ReactModal>
  );
}
