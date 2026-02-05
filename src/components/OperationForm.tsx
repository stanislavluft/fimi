import { useState, type FormEvent } from 'react';
import type { Operation, OperationFormData, OperationType } from '../types';
import { format, parseISO } from 'date-fns';

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
    setDateTime('');
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
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
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

        {/* Save/Delete Button */}
        <div>
          <button type="submit">Сохранить</button>
          {updateData && (
            <button type="button" onClick={() => onDeleteRequest?.(updateData)}>
              Удалить
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default OperationForm;
