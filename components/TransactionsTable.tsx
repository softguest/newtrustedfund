"use client";

export function TransactionsTable({ transactions }: { transactions: any[] }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Amount</th>
            {/* <th className="p-3 text-left">Source Acc</th> */}
            {/* <th className="p-3 text-left">Destination Acc</th> */}
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className="border-t">
              <td className="p-3">{tx.type}</td>
              <td
                className={`p-3 font-semibold ${
                  tx.type === "transfer_debit" || tx.type === "withdrawal" ? "text-red-500" : "text-green-500"
                }`}
              >
                XAF {Number(tx.amount).toLocaleString()}
              </td>
              {/* <td className="p-3">
                {tx.fromAccountId}
              </td>
              <td className="p-3">
                {tx.toAccountId}
              </td> */}
              <td className="p-3">
                {new Date(tx.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
