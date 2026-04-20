import { z } from 'zod';

import { OPERATION_TYPES } from '@/constants/operation-types';

export const operationValues = OPERATION_TYPES.map((op) => op.value) as [string, ...string[]];

export const operationSchema = z.object({
  amount: z
    .number({ error: 'Enter amount' })
    .positive({ error: 'The amount must be greater than zero' }),

  categoryId: z.string({ error: 'Select Category' }),

  date: z.string({ error: 'Select Date' }).min(1, { error: 'Select Date' }),

  time: z.string({ error: 'Specify time' }).min(1, { error: 'Specify time' }),

  comment: z.string().optional(),
});

export type OperationFormValues = z.infer<typeof operationSchema>;
