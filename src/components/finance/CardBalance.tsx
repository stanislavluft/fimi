import { NumericFormat } from 'react-number-format';

import { fromMinor } from '@/lib/money';

import { useFinanceStore } from '@/store/financeStore';

function CardBalance() {
  const operations = useFinanceStore((state) => state.operations);

  const balance = fromMinor(
    operations.reduce((sum, op) => {
      return op.type === 'income' ? sum + op.amountMinor : sum - op.amountMinor;
    }, 0),
  );

  return (
    <div className="bg-accent text-accent-foreground flex h-50 flex-col items-center justify-center gap-4 rounded-2xl p-8">
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
