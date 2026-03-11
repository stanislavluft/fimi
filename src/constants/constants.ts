//Operations
export const OPERATION_TYPES = [
  { value: 'income', label: 'Доход' },
  { value: 'expense', label: 'Расход' },
] as const; //

export type OperationType = (typeof OPERATION_TYPES)[number]['value'];

// Categories
export const BASE_CATEGORIES = [
  { id: 'cat_1', value: 'salary', label: 'Зарплата' },
  { id: 'cat_2', value: 'food', label: 'Еда' },
  { id: 'cat_3', value: 'transport', label: 'Транспорт' },
  { id: 'cat_4', value: 'housing', label: 'Жилье' },
  { id: 'cat_5', value: 'health', label: 'Здоровье' },
  { id: 'cat_6', value: 'entertainment', label: 'Развлечения' },
  { id: 'cat_7', value: 'other', label: 'Другое' },
];
