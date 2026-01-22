import { useState } from 'react';
import type { Transaction, TransactionType } from './types';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (amount: number, category: string, type: TransactionType) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date(),
      amount,
      category,
      type,
    };

    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };
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
