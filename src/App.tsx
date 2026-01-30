import { useState, useEffect } from 'react';
import type { Transaction, TransactionFormData } from './types';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Modal from './components/Modal';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const storage = localStorage.getItem('finance-data');
    return storage ? JSON.parse(storage) : [];
  });

  useEffect(() => {
    localStorage.setItem('finance-data', JSON.stringify(transactions));
  }, [transactions]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const addTransaction = (formData: TransactionFormData) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      ...formData,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setIsAddModalOpen(false);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <>
      <div>
        <h1>Finance Tracker React</h1>
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          modalTitle="Новая Транзакция"
        >
          <TransactionForm onSubmit={addTransaction} />
        </Modal>
        <button onClick={() => setIsAddModalOpen(true)}>Новая Транзакция</button>
        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      </div>
    </>
  );
}

export default App;
