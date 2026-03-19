import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
}

function Modal({ isOpen, onClose, modalTitle, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xs" onClick={onClose}></div>
      <article
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        className="relative m-6 flex max-h-[90vh] w-full max-w-sm flex-col rounded-4xl border border-zinc-300 bg-white p-4 shadow-2xl"
      >
        <header className="flex items-center justify-between">
          <h2 id="modal-title" className="text-base font-semibold tracking-wide text-zinc-700">
            {modalTitle}
          </h2>

          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-full p-1.5 text-zinc-500 transition-all duration-150 active:bg-zinc-100"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>
        <section className="overflow-y-auto">{children}</section>
      </article>
    </div>,
    document.body,
  );
}

export default Modal;
