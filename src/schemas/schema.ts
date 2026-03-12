import { z } from 'zod';

import { OPERATION_TYPES } from '@/constants/constants';

export const operationValues = OPERATION_TYPES.map((op) => op.value) as [string, ...string[]];

export const operationSchema = z.object({
  amount: z.number({ error: 'Введите сумму' }).positive({ error: 'Сумма должна быть больше нуля' }),

  categoryId: z.string({ error: 'Выберите категорию' }),

  date: z.string({ error: 'Выберите дату' }).min(1, { error: 'Выберите дату' }),

  time: z.string({ error: 'Укажите время' }).min(1, { error: 'Выберите дату' }),

  comment: z.string().optional(),
});

export type OperationFormValues = z.infer<typeof operationSchema>;
