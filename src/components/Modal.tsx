import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
}

function Modal({ isOpen, onClose, modalTitle, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div>
      <div onClick={onClose}></div>
      <div>
        <div>
          {modalTitle}
          <X onClick={onClose} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
