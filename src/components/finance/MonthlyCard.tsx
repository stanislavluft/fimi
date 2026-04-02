import { NumericFormat } from 'react-number-format';

import { getMonth, getYear } from 'date-fns';
import { Label, Pie, PieChart } from 'recharts';

import { type ChartConfig, ChartContainer } from '@/components/ui/chart';

import { fromMinor } from '@/lib/money';
import { cn } from '@/lib/utils';

import type { OperationType } from '@/constants/operation-types';
import { useFinanceStore } from '@/store/financeStore';

interface MonthlyCardProps {
  variant: OperationType;
  label: string;
  description: string;
  colorVar: string;
  className?: string;
}

export function MonthlyCard({
  variant,
  label,
  description,
  colorVar,
  className,
}: MonthlyCardProps) {
  const operations = useFinanceStore((state) => state.operations);

  const now = new Date();
  const currentMonth = getMonth(now);
  const currentYear = getYear(now);

  const { income, expense } = operations.reduce(
    (acc, op) => {
      const d = new Date(op.dateTime);
      if (getMonth(d) !== currentMonth || getYear(d) !== currentYear) return acc;
      if (op.type === 'income') acc.income += op.amountMinor;
      else acc.expense += op.amountMinor;
      return acc;
    },
    { income: 0, expense: 0 },
  );

  const amountMinor = variant === 'income' ? income : expense;

  const percentage = (() => {
    if (income === 0) return 0;
    if (variant === 'income') return 1;
    return Math.min(expense / income, 1);
  })();

  const safePercentage = Math.max(0, Math.min(percentage, 1));

  const chartData = [
    { name: 'filled', value: safePercentage, fill: colorVar },
    { name: 'empty', value: 1 - safePercentage, fill: 'var(--muted)' },
  ].filter((d) => d.value > 0);

  const chartConfig = {
    [variant]: { label, color: colorVar },
  } satisfies ChartConfig;

  return (
    <div
      className={cn(
        'bg-card flex w-full flex-col items-center rounded-2xl p-2 shadow-sm',
        className,
      )}
    >
      <ChartContainer config={chartConfig} className="mx-auto h-40 w-40">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={62}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
            cornerRadius={8}
            paddingAngle={safePercentage > 0 && safePercentage < 1 ? 4 : 0}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-muted-foreground uppercase"
                      >
                        {label}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-col items-center justify-center">
        <NumericFormat
          value={fromMinor(amountMinor)}
          displayType="text"
          thousandSeparator=","
          decimalScale={2}
          fixedDecimalScale
          prefix="$"
          renderText={(value) => (
            <span className="text-foreground text-md font-semibold tracking-wide">{value}</span>
          )}
        />
        <div className="justify-cente relative flex items-center gap-1 text-xs font-medium">
          <span className="text-muted-foreground">{description}</span>
        </div>
      </div>
    </div>
  );
}

export default MonthlyCard;
