import CardBalance from '@/components/finance/CardBalance';
import MonthlyCard from '@/components/finance/MonthlyCard';

function DashboardPage() {
  return (
    <section className="space-y-8">
      <header>
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <span className="text-muted-foreground text-sm">Overview of your financial status.</span>
        </div>
      </header>
      <main>
        <div className="flex gap-3">
          <CardBalance className="min-h-60 w-full flex-2" />
          <MonthlyCard
            variant="income"
            label="Income"
            description="Earned this month"
            colorVar="var(--income)"
            className="flex-1"
          />
          <MonthlyCard
            variant="expense"
            label="Expense"
            description="Spent this month"
            colorVar="var(--accent)"
            className="flex-1"
          />
        </div>
      </main>
    </section>
  );
}

export default DashboardPage;
