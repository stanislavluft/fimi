import { useState, type FormEvent } from 'react';
import type { TransactionType } from '../types';

interface TransactionFormProps {
  onSubmit: (amount: number, category: string, type: TransactionType) => void;
}

function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('income');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit(Number(amount), category, type);

    setAmount('');
    setCategory('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Sum Block */}
        <div>
          <label htmlFor="inputAmount">Сумма</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="inputAmount"
            type="number"
            placeholder="Сумма"
            required
          />
        </div>
        {/* Category Block  */}
        <div>
          <label htmlFor="inputCategory">Категория</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="inputCategory"
            type="text"
            placeholder="Категория"
            required
          />
        </div>
        <button
          style={{ backgroundColor: type === 'income' ? 'gray' : '' }}
          type="button"
          onClick={() => setType('income')}
        >
          Доход
        </button>
        <button
          style={{ backgroundColor: type === 'expense' ? 'gray' : '' }}
          type="button"
          onClick={() => setType('expense')}
        >
          Расход
        </button>
        <button type="submit">Добавить транзакцию</button>
      </form>
    </>
  );
}

export default TransactionForm;
