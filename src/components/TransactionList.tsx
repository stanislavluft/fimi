import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <>
      <ul>
        {transactions.map((transaction) => (
          <li
            style={{ color: transaction.type === 'income' ? 'green' : 'red' }}
            key={transaction.id}
          >
            <span>{transaction.category}:</span>
            <span>{transaction.amount} RUB</span>
            <time dateTime={transaction.date}>
              {new Date(transaction.date).toLocaleString('ru-Ru', dateOptions)}
            </time>
            <button onClick={() => onDelete(transaction.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TransactionList;
