import type { ReactNode } from 'react';

import { parseISO } from 'date-fns';

import OperationListItem from '@/components/finance/OperationListItem';

import { cn } from '@/lib/utils';

import type { Operation } from '@/types/types';

interface OperationListProps {
  operations: Operation[];
  onOperationSelect?: (operation: Operation) => void;
  title?: string;
  limit?: number;
  action?: ReactNode;
  className?: string;
}

const columnLabels = {
  date: 'Date',
  category: 'Category',
  type: 'Type',
  amount: 'Amount',
} as const;

const emptyTitle = 'No transactions yet';
const emptyDescription = 'Add your first transaction to start tracking your cash flow.';

function OperationList({
  operations,
  onOperationSelect,
  title = 'Recent Transactions',
  limit,
  action,
  className,
}: OperationListProps) {
  const visibleOperations = [...operations]
    .sort((left, right) => parseISO(right.dateTime).getTime() - parseISO(left.dateTime).getTime())
    .slice(0, limit);

  return (
    <section
      className={cn(
        'border-border bg-card overflow-hidden rounded-2xl border shadow-[0_18px_40px_-28px_rgba(15,23,42,0.32)]',
        className,
      )}
    >
      <header className="border-border flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>

      {visibleOperations.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
          <p className="text-base font-semibold">{emptyTitle}</p>
          <p className="text-muted-foreground max-w-md text-sm leading-6">{emptyDescription}</p>
        </div>
      ) : (
        <div>
          <div className="text-muted-foreground grid grid-cols-[minmax(92px,0.9fr)_minmax(0,1.6fr)_minmax(96px,0.85fr)] gap-4 px-6 py-4 text-[0.68rem] font-semibold tracking-[0.18em] uppercase sm:grid-cols-[minmax(108px,0.9fr)_minmax(0,1.5fr)_minmax(112px,0.75fr)_minmax(128px,0.85fr)]">
            <span>{columnLabels.date}</span>
            <span>{columnLabels.category}</span>
            <span className="hidden sm:block">{columnLabels.type}</span>
            <span className="text-right">{columnLabels.amount}</span>
          </div>

          <ul>
            {visibleOperations.map((operation) => (
              <OperationListItem
                key={operation.id}
                operation={operation}
                onSelect={onOperationSelect}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default OperationList;
