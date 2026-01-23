import { useState, useEffect } from 'react';
import type { Transaction, TransactionType } from './types';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const storage = localStorage.getItem('finance-data');
    return storage ? JSON.parse(storage) : [];
  });

  const addTransaction = (amount: number, category: string, type: TransactionType) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toISOString(),
      amount,
      category,
      type,
    };

    setTransactions([...transactions, newTransaction]);
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
