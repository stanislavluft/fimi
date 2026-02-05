import type { Operation } from '../types';
import { format, parseISO } from 'date-fns';

interface OperationListProps {
  operations: Operation[];
  onUpdateSubmit: (operation: Operation) => void;
}

function OperationList({ operations, onUpdateSubmit }: OperationListProps) {
  return (
    <>
      <ul>
        {operations.map((operation) => (
          <li
            onClick={() => onUpdateSubmit(operation)}
            style={{ color: operation.type === 'income' ? 'green' : 'red' }}
            key={operation.id}
          >
            <span>{operation.category}:</span>
            <span>{operation.amount} RUB</span>
            <time dateTime={operation.dateTime}>
              {format(parseISO(operation.dateTime), 'dd.MM.yyyy, HH:mm')}
            </time>
          </li>
        ))}
      </ul>
    </>
  );
}

export default OperationList;
