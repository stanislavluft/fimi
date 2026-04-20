import { useState } from 'react';

import OperationForm from '@/components/finance/OperationForm';
import OperationList from '@/components/finance/OperationList';
import ConfirmDelete from '@/components/shared/ConfirmDelete';
import Modal from '@/components/shared/Modal';
import { Button } from '@/components/ui/button';

import { useFinanceStore } from '@/store/financeStore';
import type { ModalState, OperationFormData } from '@/types/types';

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
        return 'New Operation';
      case 'update':
        return 'Editing an operation';
      case 'confirmDelete':
        return 'Delete operation';
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
        <Button type="button" size="lg" onClick={() => setModal({ mode: 'create' })}>
          New Operation
        </Button>
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
        title="All Operations"
        onOperationSelect={(operation) => {
          setModal({ mode: 'update', data: operation });
        }}
      />
    </section>
  );
}

export default OperationsPage;
