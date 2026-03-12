//Operation
import type { OperationType } from '@/constants/operation-types';

export interface Operation {
  id: string;
  amountMinor: number;
  category: string;
  type: OperationType;
  dateTime: string;
  description: string;
}

export type OperationFormData = Omit<Operation, 'id'>;

//Modal
export type ModalState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'update'; data: Operation }
  | { mode: 'confirmDelete'; data: Operation };
