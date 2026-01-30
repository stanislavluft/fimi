export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number;
  amount: number;
  category: string;
  type: TransactionType;
  date: string;
  description: string;
}

export type TransactionFormData = Omit<Transaction, 'id'>;
