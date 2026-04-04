import FormattedAmount from '@/components/shared/FormattedAmount';

import { cn } from '@/lib/utils';

import { useFinanceStore } from '@/store/financeStore';

interface CardBalanceProps {
  className?: string;
}

function CardBalance({ className }: CardBalanceProps) {
  const balanceMinor = useFinanceStore((state) =>
    state.operations.reduce((sum, op) => {
      return op.type === 'income' ? sum + op.amountMinor : sum - op.amountMinor;
    }, 0),
  );

  return (
    <div
      className={cn(
        'bg-accent text-accent-foreground flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl p-8',
        className,
      )}
    >
      <p className="text-xs tracking-widest opacity-60">TOTAL BALANCE</p>
      <FormattedAmount
        amountMinor={balanceMinor}
        className="tracking-light text-4xl font-semibold"
      />
    </div>
  );
}

export default CardBalance;
