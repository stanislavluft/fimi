export type OperationType = 'income' | 'expense';

export interface Operation {
  id: number;
  amount: number;
  category: string;
  type: OperationType;
  date: string;
  description: string;
}

export type OperationFormData = Omit<Operation, 'id'>;
