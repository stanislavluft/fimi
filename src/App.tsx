import { useState, useEffect } from 'react';
import type { Transaction, TransactionFormData } from './types';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const storage = localStorage.getItem('finance-data');
    return storage ? JSON.parse(storage) : [];
  });

  const addTransaction = (formData: TransactionFormData) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      ...formData,
    };

    setTransactions((prev) => [...prev, newTransaction]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('finance-data', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <>
      <div>
        <h1>Finance Tracker React</h1>
        <TransactionForm onSubmit={addTransaction} />
        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      </div>
    </>
  );
}

export default App;
