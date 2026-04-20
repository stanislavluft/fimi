import { format, parseISO } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight, CircleEllipsis } from 'lucide-react';

import FormattedAmount from '@/components/shared/FormattedAmount';

import { cn } from '@/lib/utils';

import { BASE_CATEGORIES } from '@/constants/categories';
import type { Operation } from '@/types/types';

interface OperationListItemProps {
  operation: Operation;
  onSelect?: (operation: Operation) => void;
}

const typeMeta = {
  income: {
    label: 'Income',
    icon: ArrowDownLeft,
    badgeClassName: 'bg-income/10 text-income',
    avatarClassName: 'bg-income/10 text-income',
  },
  expense: {
    label: 'Expense',
    icon: ArrowUpRight,
    badgeClassName: 'bg-muted text-foreground',
    avatarClassName: 'bg-secondary text-muted-foreground',
  },
} as const;

function OperationListItem({ operation, onSelect }: OperationListItemProps) {
  const meta = typeMeta[operation.type];
  const TypeIcon = meta.icon;
  const categoryMeta = BASE_CATEGORIES.find((category) => category.id === operation.category);
  const CategoryIcon = categoryMeta?.icon ?? CircleEllipsis;

  const content = (
    <div className="grid grid-cols-[minmax(92px,0.9fr)_minmax(0,1.6fr)_minmax(96px,0.85fr)] items-center gap-4 sm:grid-cols-[minmax(108px,0.9fr)_minmax(0,1.5fr)_minmax(112px,0.75fr)_minmax(128px,0.85fr)]">
      <div>
        <time className="text-muted-foreground text-sm font-medium" dateTime={operation.dateTime}>
          {format(parseISO(operation.dateTime), 'MMM dd, yyyy')}
        </time>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-full',
              meta.avatarClassName,
            )}
          >
            <CategoryIcon className="size-5" strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {categoryMeta?.label ?? operation.category}
            </p>
            <p className="text-muted-foreground truncate text-sm">
              {operation.description || 'No comment'}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <span
          className={cn(
            'inline-flex min-w-22 items-center justify-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
            meta.badgeClassName,
          )}
        >
          <TypeIcon className="size-3.5" strokeWidth={2} />
          {meta.label}
        </span>
      </div>

      <div className="text-right">
        <FormattedAmount
          amountMinor={operation.amountMinor}
          className={cn(
            'text-sm font-semibold tracking-normal',
            operation.type === 'income' ? 'text-income' : 'text-card-foreground',
          )}
        />
      </div>
    </div>
  );

  return (
    <li className="border-border border-t first:border-t-0">
      {onSelect ? (
        <button
          type="button"
          onClick={() => onSelect(operation)}
          className="hover:bg-muted focus-visible:bg-muted w-full px-5 py-4 text-left transition-colors focus-visible:outline-none"
        >
          {content}
        </button>
      ) : (
        <div className="px-5 py-4">{content}</div>
      )}
    </li>
  );
}

export default OperationListItem;
