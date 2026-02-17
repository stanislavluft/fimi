import { useState, type FormEvent } from 'react';
import type { Operation, OperationFormData, OperationType } from '@/types';
import { format, parseISO } from 'date-fns';
import { Trash } from 'lucide-react';

interface OperationFormProps {
  onSubmit: (formData: OperationFormData) => void;
  onDeleteRequest?: (data: Operation) => void;
  updateData?: Operation | null;
}

function OperationForm({ onSubmit, onDeleteRequest, updateData }: OperationFormProps) {
  const [amount, setAmount] = useState(updateData?.amount || '');
  const [category, setCategory] = useState(updateData?.category || '');
  const [type, setType] = useState<OperationType>(updateData?.type || 'income');
  const [description, setDescription] = useState(updateData?.description || '');

  // Date
  const initialDate = updateData?.dateTime
    ? format(parseISO(updateData.dateTime), "yyyy-MM-dd'T'HH:mm")
    : format(new Date(), "yyyy-MM-dd'T'HH:mm");
  const [dateTime, setDateTime] = useState(initialDate);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isoDate = parseISO(dateTime).toISOString();
    onSubmit({ amount: +amount, category, type, dateTime: isoDate, description });

    setAmount('');
    setCategory('');
    setDescription('');
    setDateTime(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  };

  return (
    <>
      <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
        {/* Amount Block */}
        <div className="flex flex-col items-center justify-center pt-2">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="inputAmount"
            type="string"
            inputMode="numeric"
            placeholder="0.00"
            required
            autoFocus
            className="w-full bg-transparent text-center text-2xl tracking-tight text-zinc-900 placeholder:text-zinc-200 focus:outline-none"
          />
        </div>

        {/* Type Button */}
        <div className="mx-5 flex items-center">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 rounded-full py-1.5 text-sm transition-all duration-150 ${
              type === 'income' ? 'bg-zinc-50 text-zinc-900' : 'text-zinc-400'
            }`}
          >
            Доход
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 rounded-4xl py-1.5 text-sm transition-all duration-150 ${
              type === 'expense' ? 'bg-zinc-50 text-zinc-900' : 'text-zinc-400'
            }`}
          >
            Расход
          </button>
          {/* <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 rounded-3xl bg-transparent py-1.5 text-sm transition-all duration-150 ${
              type === 'transfer' ? 'text-zinc-900 ring ring-zinc-200' : 'text-zinc-300'
            }`}
          >
            Перевод
          </button> */}
        </div>

        <div className="flex flex-col overflow-hidden px-2">
          {/* Category Block  */}
          <div className="flex items-center justify-between px-2 py-4">
            <label className="text-sm tracking-wider text-zinc-700" htmlFor="inputDescription">
              Категория
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="inputCategory"
              type="text"
              placeholder="Выберите"
              required
              className="bg-transparent text-right text-sm text-zinc-500 focus:text-zinc-900 focus:outline-none"
            />
          </div>

          {/* Date Block */}
          <div className="flex items-center justify-between px-2 py-4">
            <label className="text-sm tracking-wider text-zinc-700" htmlFor="inputDescription">
              Дата
            </label>
            <input
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              id="inputDate"
              type="datetime-local"
              required
              className="bg-transparent text-right text-sm text-zinc-500 focus:text-zinc-900 focus:outline-none"
            />
          </div>

          {/* Description Block  */}
          <div className="flex items-center justify-between px-2 py-4">
            <label className="text-sm tracking-wider text-zinc-700" htmlFor="inputDescription">
              Комментарий
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="inputDescription"
              type="text"
              placeholder="Необязательно"
              className="w-full bg-transparent text-right text-sm text-zinc-500 placeholder:text-zinc-400 focus:text-zinc-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Save/Delete Button */}
        <div className="flex w-full justify-center gap-2">
          <button
            className="flex h-12 w-full items-center justify-center rounded-3xl bg-zinc-900 text-sm font-medium text-white transition-all duration-150 active:text-white/80 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
          >
            Сохранить
          </button>
          {updateData && (
            <button
              type="button"
              onClick={() => onDeleteRequest?.(updateData)}
              className="flex h-12 w-18 items-center justify-center rounded-3xl bg-red-500/10 text-red-500 transition-colors duration-150 active:text-red-400"
            >
              <Trash />
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default OperationForm;
