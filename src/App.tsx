import { useState, useEffect } from 'react';
import type { Operation, OperationFormData } from './types';
import OperationForm from './components/OperationForm';
import OperationList from './components/OperationList';
import Modal from './components/Modal';
import { v7 as uuidv7 } from 'uuid';

function App() {
  const [operations, setOperations] = useState<Operation[]>(() => {
    const storage = localStorage.getItem('finance-data');
    return storage ? JSON.parse(storage) : [];
  });

  useEffect(() => {
    localStorage.setItem('finance-data', JSON.stringify(operations));
  }, [operations]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const addOperation = (formData: OperationFormData) => {
    const newOperation: Operation = {
      id: uuidv7(),
      ...formData,
    };

    setOperations((prev) => [...prev, newOperation]);
    setIsAddModalOpen(false);
  };

  const deleteOperation = (id: string) => {
    setOperations(operations.filter((t) => t.id !== id));
  };

  return (
    <>
      <div>
        <h1>Finance Tracker React</h1>
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          modalTitle="Новая Операция"
        >
          <OperationForm onSubmit={addOperation} />
        </Modal>
        <button onClick={() => setIsAddModalOpen(true)}>Новая Операция</button>
        <OperationList operations={operations} onDelete={deleteOperation} />
      </div>
    </>
  );
}

export default App;
