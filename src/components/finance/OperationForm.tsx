import { useRef } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse, parseISO } from 'date-fns';
import { Trash } from 'lucide-react';

import { fromMinor, toMinor } from '@/lib/money';

import { BASE_CATEGORIES } from '@/constants/categories';
import { type OperationFormValues, operationSchema } from '@/schemas/operation-schema';
import type { Operation, OperationFormData } from '@/types/types';

import AmountField from './fields/AmountField';
import CategoryField from './fields/CategoryField';
import CommentField from './fields/CommentField';
import DateTimeField from './fields/DateTimeField';

interface OperationFormProps {
  onSubmit: (formData: OperationFormData) => void;
  onDeleteRequest?: (data: Operation) => void;
  updateData?: Operation | null;
}

function OperationForm({ onSubmit, onDeleteRequest, updateData }: OperationFormProps) {
  const categoryRef = useRef<HTMLDivElement>(null);
  const defaultDate = updateData?.dateTime ? parseISO(updateData.dateTime) : new Date();

  const methods = useForm<OperationFormValues>({
    resolver: zodResolver(operationSchema),
    defaultValues: {
      amount: updateData ? parseFloat(fromMinor(updateData.amountMinor)) : undefined,
      categoryId: updateData?.category ?? 'x7k2',
      comment: updateData?.description ?? '',
      date: format(defaultDate, 'yyyy-MM-dd'),
      time: format(defaultDate, 'HH:mm'),
    },
  });

  const categoryId = useWatch({ control: methods.control, name: 'categoryId' });
  const selectedType = BASE_CATEGORIES.find((cat) => cat.id === categoryId)?.type;

  const focusCategory = () => {
    categoryRef.current?.querySelector('input')?.click();
  };

  const handleSubmit = methods.handleSubmit((values) => {
    const category = BASE_CATEGORIES.find((cat) => cat.id === values.categoryId);
    const dateTime = parse(
      `${values.date} ${values.time}`,
      'yyyy-MM-dd HH:mm',
      new Date(),
    ).toISOString();

    onSubmit({
      amountMinor: toMinor(String(values.amount ?? 0)),
      category: values.categoryId,
      type: category!.type,
      dateTime,
      description: values.comment ?? '',
    });

    methods.reset({
      amount: undefined,
      categoryId: 'x7k2',
      comment: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'HH:mm'),
    });
  });

  return (
    <FormProvider {...methods}>
      <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
        <AmountField />

        <div className="mx-5 flex items-center">
          {(['income', 'expense'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={focusCategory}
              className={`flex-1 rounded-full py-1.5 text-sm transition-all duration-150 ${
                selectedType === t
                  ? t === 'income'
                    ? 'bg-income/10 text-income'
                    : 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {t === 'income' ? 'Income' : 'Expense'}
            </button>
          ))}
        </div>

        <div className="flex flex-col overflow-hidden p-2">
          <div ref={categoryRef}>
            <CategoryField />
          </div>
          <DateTimeField />
          <CommentField />
        </div>

        <div className="flex w-full justify-center gap-2">
          <button
            className="bg-primary text-primary-foreground flex h-12 w-full items-center justify-center rounded-3xl text-sm font-medium transition-all duration-150 active:opacity-80 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
          >
            Save
          </button>
          {updateData && (
            <button
              type="button"
              onClick={() => onDeleteRequest?.(updateData)}
              className="bg-destructive/10 text-destructive flex h-12 w-18 items-center justify-center rounded-3xl transition-colors duration-150 active:opacity-80"
            >
              <Trash />
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default OperationForm;
