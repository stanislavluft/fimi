import { NumericFormat } from 'react-number-format';

import { fromMinor } from '@/lib/money';
import { cn } from '@/lib/utils';

import { useFinanceStore } from '@/store/financeStore';

interface CardBalanceProps {
  className?: string;
}

function CardBalance({ className }: CardBalanceProps) {
  const balance = useFinanceStore((state) =>
    fromMinor(
      state.operations.reduce((sum, op) => {
        return op.type === 'income' ? sum + op.amountMinor : sum - op.amountMinor;
      }, 0),
    ),
  );

  return (
    <div
      className={cn(
        'bg-accent text-accent-foreground flex h-50 flex-col items-center justify-center gap-4 rounded-2xl p-8',
        className,
      )}
    >
      <p className="text-xs tracking-widest opacity-60">TOTAL BALANCE</p>
      <NumericFormat
        value={balance}
        displayType="text"
        thousandSeparator=","
        decimalSeparator="."
        decimalScale={2}
        fixedDecimalScale
        prefix="$"
        renderText={(value) => (
          <span className="tracking-light text-4xl font-semibold">{value}</span>
        )}
      />
    </div>
  );
}

export default CardBalance;
