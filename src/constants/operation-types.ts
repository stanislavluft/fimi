export const OPERATION_TYPES = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
] as const; //

export type OperationType = (typeof OPERATION_TYPES)[number]['value'];
