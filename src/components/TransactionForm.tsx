import { useState, type FormEvent } from 'react';
import type { TransactionType } from '../types';

interface TransactionFormProps {
  onSubmit: (amount: number, category: string, type: TransactionType) => void;
}

function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('income');
  const [formDate, setFormDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit(Number(amount), category, type);

    setAmount('');
    setCategory('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Type Button */}
        <div>
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
        </div>

        {/* Amount Block */}
        <div>
          <label htmlFor="inputAmount">Сумма</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="inputAmount"
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        {/* Date Block */}
        <div>
          <label htmlFor="inputDate">Дата</label>
          <input
            value={formDate}
            onChange={(e) => setFormDate(e.target.value)}
            id="inputDate"
            type="datetime-local"
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
            placeholder="Например: транспорт"
            required
          />
        </div>

        {/* Description Block  */}
        <div>
          <label htmlFor="inputDescription">Комментарий</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="inputDescription"
            type="text"
            placeholder="Например: такси"
          />
        </div>

        <button type="submit">Сохранить</button>
      </form>
    </>
  );
}

export default TransactionForm;
