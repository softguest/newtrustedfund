'use client';

interface TransactionListProps {
  transactions: any[]; // Accept raw data
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="w-full mt-6 space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Transactions</h3>

      {/* Table layout for md+ */}
      <div className="hidden md:block w-full rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-3 px-4 text-sm text-gray-600">Type</th>
              <th className="py-3 px-4 text-sm text-gray-600">From</th>
              <th className="py-3 px-4 text-sm text-gray-600">To</th>
              <th className="py-3 px-4 text-sm text-gray-600">Amount</th>
              <th className="py-3 px-4 text-sm text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr
                key={tx.id}
                className="border-b border-white/10 hover:bg-white/10 transition-colors"
              >
                <td className="py-2 px-4 text-gray-800">{tx.type}</td>
                <td className="py-2 px-4 text-gray-700">{tx.fromAccountId || '-'}</td>
                <td className="py-2 px-4 text-gray-700">{tx.toAccountId || '-'}</td>
                <td className={`py-2 px-4 font-semibold ${
                  tx.type === 'transfer_debit' || tx.type === 'withdrawal'
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}>
                  {Number(tx.amount).toLocaleString()} XAF
                </td>
                <td className="py-2 px-4 text-gray-500">
                  {tx.created_at ? new Date(tx.created_at).toLocaleDateString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        {transactions.map(tx => (
          <div
            key={tx.id}
            className="
              relative flex flex-col w-full p-4 rounded-2xl
              border border-white/20 bg-white/30 backdrop-blur-xl
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
            "
          >
            {/* Glow overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">{tx.type}</span>
                <span className={`font-bold ${
                  tx.type === 'transfer_debit' || tx.type === 'withdrawal'
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}>
                  {Number(tx.amount).toLocaleString()} XAF
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>From: {tx.fromAccountId || '-'}</div>
                <div>To: {tx.toAccountId || '-'}</div>
                <div>Date: {tx.created_at ? new Date(tx.created_at).toLocaleDateString() : '-'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
