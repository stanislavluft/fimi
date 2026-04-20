import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

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
      if (e.key === 'Escape') onClose();
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
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xs" onClick={onClose} />
      <article
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        className="border-border bg-card relative m-6 flex max-h-[90vh] w-full max-w-sm flex-col rounded-4xl border p-4 shadow-2xl"
      >
        <header className="flex items-center justify-between pl-2">
          <h2
            id="modal-title"
            className="text-card-foreground text-base font-semibold tracking-wide"
          >
            {modalTitle}
          </h2>
          <Button variant="ghost" onClick={onClose} className="rounded-full" size="icon">
            <X size={20} />
          </Button>
        </header>
        <section className="overflow-y-auto">{children}</section>
      </article>
    </div>,
    document.body,
  );
}

export default Modal;
