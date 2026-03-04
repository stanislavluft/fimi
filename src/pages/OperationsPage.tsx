import { useState } from 'react';
import ConfirmDelete from '@/components/ConfirmDelete';
import Modal from '@/components/Modal';
import OperationForm from '@/components/OperationForm';
import OperationList from '@/components/OperationList';
import { useFinanceStore } from '@/store/financeStore';
import type { ModalState, OperationFormData } from '@/types';

function OperationsPage() {
  const operations = useFinanceStore((state) => state.operations);
  const addOperationToStore = useFinanceStore((state) => state.addOperation);
  const updateOperationInStore = useFinanceStore((state) => state.updateOperation);
  const deleteOperationFromStore = useFinanceStore((state) => state.deleteOperation);

  const [modal, setModal] = useState<ModalState>({ mode: 'closed' });

  const addOperation = (formData: OperationFormData) => {
    addOperationToStore(formData);
    setModal({ mode: 'closed' });
  };

  const deleteOperation = (id: string) => {
    deleteOperationFromStore(id);
    setModal({ mode: 'closed' });
  };

  const updateOperation = (formData: OperationFormData) => {
    if (modal.mode !== 'update') {
      return;
    }

    const idToUpdate = modal.data.id;

    updateOperationInStore(idToUpdate, formData);
    setModal({ mode: 'closed' });
  };

  const getModalTitle = (state: ModalState) => {
    switch (state.mode) {
      case 'closed':
        return '';
      case 'create':
        return 'Новая операция';
      case 'update':
        return 'Редактирование операции';
      case 'confirmDelete':
        return 'Подтверждение действия';
    }
  };

  const renderModal = (state: ModalState) => {
    switch (state.mode) {
      case 'closed':
        return null;
      case 'create':
        return <OperationForm onSubmit={addOperation} />;
      case 'update':
        return (
          <OperationForm
            onSubmit={updateOperation}
            updateData={state.data}
            key={state.data.id}
            onDeleteRequest={() => setModal({ mode: 'confirmDelete', data: state.data })}
          />
        );
      case 'confirmDelete':
        return (
          <ConfirmDelete
            onCancel={() => setModal({ mode: 'update', data: state.data })}
            onConfirm={() => deleteOperation(state.data.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Operations</h1>
        <button
          type="button"
          className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
          onClick={() => setModal({ mode: 'create' })}
        >
          Новая операция
        </button>
      </div>
      <Modal
        isOpen={modal.mode !== 'closed'}
        onClose={() => setModal({ mode: 'closed' })}
        modalTitle={getModalTitle(modal)}
      >
        {renderModal(modal)}
      </Modal>
      <OperationList
        operations={operations}
        onUpdateSubmit={(operation) => {
          setModal({ mode: 'update', data: operation });
        }}
      />
    </section>
  );
}

export default OperationsPage;
