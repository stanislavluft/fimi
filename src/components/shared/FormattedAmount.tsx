import { NumericFormat } from 'react-number-format';

import { fromMinor } from '@/lib/money';
import { cn } from '@/lib/utils';

interface FormattedAmountProps {
  amountMinor: number;
  className?: string;
}

function FormattedAmount({ amountMinor, className }: FormattedAmountProps) {
  const absoluteAmount = fromMinor(Math.abs(amountMinor));

  return (
    <NumericFormat
      value={absoluteAmount}
      displayType="text"
      thousandSeparator=","
      decimalSeparator="."
      decimalScale={2}
      fixedDecimalScale
      prefix="$"
      renderText={(value) => <span className={cn(className)}>{value}</span>}
    />
  );
}

export default FormattedAmount;
