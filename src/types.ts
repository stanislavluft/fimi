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

export type ModalState = { mode: 'closed' } | { mode: 'create' };

export type ModalActions = {
  addOperation: (formData: OperationFormData) => void;
};
