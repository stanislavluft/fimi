import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Operation } from '@/types';
import type { OperationFormData } from '@/types';
import { v7 as uuidv7 } from 'uuid';

interface FinanceState {
  operations: Operation[];

  addOperation: (formData: OperationFormData) => void;
  updateOperation: (id: string, formData: OperationFormData) => void;
  deleteOperation: (id: string) => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      operations: [],

      addOperation: (formData) =>
        set((state) => ({
          operations: [{ id: uuidv7(), ...formData }, ...state.operations],
        })),

      deleteOperation: (id) =>
        set((state) => ({
          operations: state.operations.filter((op) => op.id !== id),
        })),

      updateOperation: (id, updateData) =>
        set((state) => ({
          operations: state.operations.map((op) => (op.id === id ? { ...op, ...updateData } : op)),
        })),
    }),
    {
      name: 'finance-data',
    },
  ),
);
