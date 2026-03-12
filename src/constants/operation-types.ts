export const OPERATION_TYPES = [
  { value: 'income', label: 'Доход' },
  { value: 'expense', label: 'Расход' },
] as const; //

export type OperationType = (typeof OPERATION_TYPES)[number]['value'];
