import { Link } from 'react-router-dom';

import CardBalance from '@/components/finance/CardBalance';
import MonthlyCard from '@/components/finance/MonthlyCard';
import OperationList from '@/components/finance/OperationList';

import { useFinanceStore } from '@/store/financeStore';

function DashboardPage() {
  const operations = useFinanceStore((state) => state.operations);

  return (
    <section className="space-y-8">
      <header>
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <span className="text-muted-foreground text-sm">Overview of your financial status.</span>
        </div>
      </header>
      <main className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)_minmax(240px,1fr)]">
          <CardBalance className="col-span-2 h-60 w-full lg:col-span-1" />
          <MonthlyCard
            variant="income"
            label="Income"
            description="Earned this month"
            colorVar="var(--income)"
            className="lg:min-w-60"
          />
          <MonthlyCard
            variant="expense"
            label="Expense"
            description="Spent this month"
            colorVar="var(--accent)"
            className="lg:min-w-60"
          />
        </div>
        <OperationList
          operations={operations}
          limit={3}
          action={
            <Link
              to="/operations"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              View All
            </Link>
          }
        />
      </main>
    </section>
  );
}

export default DashboardPage;
