import type { OperationType } from './operation-types';

export const BASE_CATEGORIES = [
  { id: 'x7k2', label: 'Зарплата', type: 'income' },
  { id: 'b3qw', label: 'Еда', type: 'expense' },
  { id: 'n6ht', label: 'Транспорт', type: 'expense' },
  { id: 'r4vz', label: 'Жилье', type: 'expense' },
  { id: 'c8yd', label: 'Здоровье', type: 'expense' },
  { id: 'j1ls', label: 'Развлечения', type: 'expense' },
  { id: 'g5ek', label: 'Другое', type: 'expense' },
] as const satisfies { id: string; label: string; type: OperationType }[];
