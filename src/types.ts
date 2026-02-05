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

export type ModalState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'update'; data: Operation }
  | { mode: 'confirmDelete'; data: Operation };

export type ModalActions = {
  addOperation: (formData: OperationFormData) => void;
  updateOperation: (formData: OperationFormData) => void;
  deleteOperation: (id: string) => void;
};
