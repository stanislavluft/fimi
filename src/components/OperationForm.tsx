import { useState, type FormEvent } from 'react';
import type { Operation, OperationFormData, OperationType } from '../types';
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
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {/* Type Button */}
        <div className="flex justify-evenly rounded-4xl bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 rounded-4xl py-1.5 text-sm transition-all duration-150 ${
              type === 'income' ? 'bg-white text-zinc-900 shadow-md' : 'text-zinc-400'
            }`}
          >
            Доход
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 rounded-4xl py-1.5 text-sm transition-all duration-150 ${
              type === 'expense' ? 'bg-white text-zinc-900 shadow-md' : 'text-zinc-400'
            }`}
          >
            Расход
          </button>
        </div>

        {/* Amount Block */}
        <div className="flex flex-col">
          <label className="mb-1 ml-1 text-xs tracking-wider text-zinc-700" htmlFor="inputAmount">
            Сумма
          </label>
          <div className="relative w-full">
            <span className="pointer-events-none absolute top-1/2 left-4 ml-1 -translate-y-1/2 font-light text-zinc-400">
              $
            </span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              id="inputAmount"
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              step="0.01"
              required
              autoFocus
              className="w-full rounded-4xl border-1 border-zinc-200 bg-zinc-50 p-3 pl-9 text-sm text-zinc-700 shadow-xs transition-all duration-150 placeholder:text-zinc-300 focus:border-transparent focus:ring-2 focus:ring-zinc-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Block  */}
        <div className="flex flex-col">
          <label className="mb-1 ml-1 text-xs tracking-wider text-zinc-700" htmlFor="inputCategory">
            Категория
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="inputCategory"
            type="text"
            placeholder="Например: транспорт"
            required
            className="rounded-4xl border-1 border-zinc-200 bg-zinc-50 p-3 pl-5 text-sm text-zinc-700 shadow-xs transition-all duration-150 placeholder:text-zinc-300 focus:border-transparent focus:ring-2 focus:ring-zinc-900 focus:outline-none"
          />
        </div>

        {/* Date Block */}
        <div className="flex flex-col">
          <label className="mb-1 ml-1 text-xs tracking-wider text-zinc-700" htmlFor="inputDate">
            Дата
          </label>
          <input
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            id="inputDate"
            type="datetime-local"
            required
            className="rounded-4xl border-1 border-zinc-200 bg-zinc-50 p-3 pl-5 text-sm text-zinc-700 shadow-xs transition-all duration-150 placeholder:text-zinc-400 focus:border-transparent focus:ring-2 focus:ring-zinc-900 focus:outline-none"
          />
        </div>

        {/* Description Block  */}
        <div className="flex flex-col">
          <label
            className="mb-1 ml-1 text-xs tracking-wider text-zinc-700"
            htmlFor="inputDescription"
          >
            Комментарий
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="inputDescription"
            type="text"
            placeholder="Например: такси"
            className="rounded-4xl border-1 border-zinc-200 bg-zinc-50 p-3 pl-5 text-sm text-zinc-700 shadow-xs transition-all duration-150 placeholder:text-zinc-300 focus:border-transparent focus:ring-2 focus:ring-zinc-900 focus:outline-none"
          />
        </div>

        {/* Save/Delete Button */}
        <div className="flex w-full justify-center gap-2">
          <button
            className="flex h-14 w-full items-center justify-center rounded-4xl bg-zinc-900 text-sm font-medium text-white shadow-md transition-all duration-150 active:text-white/80"
            type="submit"
          >
            Сохранить
          </button>
          {updateData && (
            <button
              type="button"
              onClick={() => onDeleteRequest?.(updateData)}
              className="flex h-14 w-18 items-center justify-center rounded-4xl bg-red-100/50 text-red-600 shadow-md transition-colors duration-150 active:text-red-400"
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
