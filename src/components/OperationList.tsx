import type { Operation } from '../types';
import { format, parseISO } from 'date-fns';

interface OperationListProps {
  operations: Operation[];
  onDelete: (id: string) => void;
}

function OperationList({ operations, onDelete }: OperationListProps) {
  return (
    <>
      <ul>
        {operations.map((operation) => (
          <li style={{ color: operation.type === 'income' ? 'green' : 'red' }} key={operation.id}>
            <span>{operation.category}:</span>
            <span>{operation.amount} RUB</span>
            <time dateTime={operation.dateTime}>
              {format(parseISO(operation.dateTime), 'dd.MM.yyyy, HH:mm')}
            </time>
            <button onClick={() => onDelete(operation.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default OperationList;
