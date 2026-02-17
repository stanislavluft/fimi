import { useState, useEffect } from 'react';
import type { Operation, OperationFormData, ModalState, ModalActions } from './types';
import OperationForm from '@/components/OperationForm';
import OperationList from '@/components/OperationList';
import ConfirmDelete from '@/components/ConfirmDelete';
import Modal from '@/components/Modal';
import { v7 as uuidv7 } from 'uuid';

function App() {
  const [modal, setModal] = useState<ModalState>({ mode: 'closed' });

  // Storage
  const [operations, setOperations] = useState<Operation[]>(() => {
    const storage = localStorage.getItem('finance-data');
    return storage ? JSON.parse(storage) : [];
  });

  useEffect(() => {
    localStorage.setItem('finance-data', JSON.stringify(operations));
  }, [operations]);

  // Add, Update Operation
  const addOperation = (formData: OperationFormData) => {
    const newOperation: Operation = {
      id: uuidv7(),
      ...formData,
    };

    setOperations((prev) => [...prev, newOperation]);
    setModal({ mode: 'closed' });
  };

  const deleteOperation = (id: string) => {
    setOperations(operations.filter((t) => t.id !== id));

    setModal({ mode: 'closed' });
  };

  const updateOperation = (formData: OperationFormData) => {
    if (modal.mode !== 'update') return;

    const idToUpdate = modal.data.id;

    setOperations((prev) =>
      prev.map((op) => {
        if (op.id === idToUpdate) {
          return { id: idToUpdate, ...formData };
        }
        return op;
      }),
    );
    setModal({ mode: 'closed' });
  };

  // Modal
  const getModalTitle = (modal: ModalState) => {
    switch (modal.mode) {
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

  const renderModal = (modal: ModalState, actions: ModalActions) => {
    switch (modal.mode) {
      case 'closed':
        return null;
      case 'create':
        return <OperationForm onSubmit={actions.addOperation} />;
      case 'update':
        return (
          <OperationForm
            onSubmit={actions.updateOperation}
            updateData={modal.data}
            key={modal.data ? modal.data.id : 'create'}
            onDeleteRequest={() => setModal({ mode: 'confirmDelete', data: modal.data })}
          />
        );
      case 'confirmDelete':
        return (
          <ConfirmDelete
            onCancel={() => setModal({ mode: 'update', data: modal.data })}
            onConfirm={() => actions.deleteOperation(modal.data.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <h1>Finance Tracker React</h1>
        <Modal
          isOpen={modal.mode !== 'closed'}
          onClose={() => setModal({ mode: 'closed' })}
          modalTitle={getModalTitle(modal)}
        >
          {renderModal(modal, { addOperation, updateOperation, deleteOperation })}
        </Modal>
        <button onClick={() => setModal({ mode: 'create' })}>Новая операция</button>
        <OperationList
          operations={operations}
          onUpdateSubmit={(operation: Operation) => {
            setModal({ mode: 'update', data: operation });
          }}
        />
      </div>
    </>
  );
}

export default App;
