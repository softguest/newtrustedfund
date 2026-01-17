import StatsCard from '@/components/dashboardtwo/StatsCard';
import MoneyFlowChart from '@/components/dashboardtwo/MoneyFlowChart';
import TargetGoalsList from '@/components/TargetGoalsList';
import TransactionList from '@/components/dashboardtwo/TransactionList';
import AllTopGroups from '@/components/AllTopGroups';
import { getUserAccounts, getRecentTransactions } from '@/_actions/getAccounts';
import { DashboardLayout } from '@/components/dashboard-layout';

export default async function Dashboard() {
  // 🔐 user is guaranteed by layout
    const accounts = await getUserAccounts();
    const transactions = await getRecentTransactions();

    const current = accounts.find(a => a.type === 'current');
    const savings = accounts.find(a => a.type === 'savings');
    const targets = accounts.filter(a => a.type === 'target');

  return (
    <DashboardLayout currentBalance={savings?.balance || 0}>
      <div className="space-y-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* <StatsCard title="Current Account Balance" balance={current?.balance ?? 0} change="+16%" /> */}
              <StatsCard title="Savings Account Balance" balance={savings?.balance ?? 0} change="-0.6%" />
            </section>

            {/* Money Flow Chart */}
            <div className="w-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-md p-4">
              <MoneyFlowChart />
            </div>

            {/* Target Goals List */}
            <div className="w-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-md p-4">
              <TargetGoalsList />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="w-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-md p-4">
              <AllTopGroups />
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="w-full rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-md p-4">
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
