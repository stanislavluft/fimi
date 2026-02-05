import { useState, useEffect } from 'react';
import type { Operation, OperationFormData, ModalState, ModalActions } from './types';
import OperationForm from './components/OperationForm';
import OperationList from './components/OperationList';
import Modal from './components/Modal';
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

  // Add and Delete operation
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
  };

  // Modal
  const getModalTitle = (modal: ModalState) => {
    switch (modal.mode) {
      case 'closed':
        return '';
      case 'create':
        return 'Новая операция';
    }
  };

  const renderModal = (modal: ModalState, actions: ModalActions) => {
    switch (modal.mode) {
      case 'closed':
        return null;
      case 'create':
        return <OperationForm onSubmit={actions.addOperation} />;
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
          {renderModal(modal, { addOperation })}
        </Modal>
        <button onClick={() => setModal({ mode: 'create' })}>Новая операция</button>
        <OperationList operations={operations} onDelete={deleteOperation} />
      </div>
    </>
  );
}

export default App;
