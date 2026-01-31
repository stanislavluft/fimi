import type { Operation } from '../types';

interface OperationListProps {
  operations: Operation[];
  onDelete: (id: number) => void;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

function OperationList({ operations, onDelete }: OperationListProps) {
  return (
    <>
      <ul>
        {operations.map((operation) => (
          <li style={{ color: operation.type === 'income' ? 'green' : 'red' }} key={operation.id}>
            <span>{operation.category}:</span>
            <span>{operation.amount} RUB</span>
            <time dateTime={operation.date}>
              {new Date(operation.date).toLocaleString('ru-Ru', dateOptions)}
            </time>
            <button onClick={() => onDelete(operation.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default OperationList;
