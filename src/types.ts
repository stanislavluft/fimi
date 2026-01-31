export type OperationType = 'income' | 'expense';

export interface Operation {
  id: string;
  amount: number;
  category: string;
  type: OperationType;
  dateTime: string;
  description: string;
}

export type OperationFormData = Omit<Operation, 'id'>;
