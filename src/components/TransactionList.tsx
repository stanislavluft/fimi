import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}
function TransactionList({ transactions }: TransactionListProps) {
  return (
    <>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.category} : {transaction.amount} RUB
          </li>
        ))}
      </ul>
    </>
  );
}

export default TransactionList;
