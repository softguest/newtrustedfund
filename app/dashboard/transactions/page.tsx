import { DashboardLayout } from "@/components/dashboard-layout";
import TransactionTable from "@/components/transactions/TransactionTable";
import { getCurrentUser } from "@/lib/auth";

export default async function TransactionsPage() {
  const user = await getCurrentUser();

  return (
    <DashboardLayout>
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      <TransactionTable userId={user.id} />
    </div>
    </DashboardLayout>
  );
}
