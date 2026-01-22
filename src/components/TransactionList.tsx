import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}
function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <>
      <ul>
        {transactions.map((transaction) => (
          <li
            style={{ color: transaction.type === 'income' ? 'green' : 'red' }}
            key={transaction.id}
          >
            {transaction.category} : {transaction.amount} RUB
            <button onClick={() => onDelete(transaction.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TransactionList;
