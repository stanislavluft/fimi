import { useState } from 'react';
import type { Transaction } from './types';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, amount: 5000, category: 'Зарплата', type: 'income', date: new Date() },
    { id: 2, amount: 100, category: 'Кофе', type: 'expense', date: new Date() },
  ]);
  return (
    <>
      <div>
        <h1>Finance Tracker React</h1>
        <TransactionForm />
        <TransactionList transactions={transactions} />
      </div>
    </>
  );
}

export default App;
