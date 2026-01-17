// export default function MyContributionCard({
//   contributed,
//   expected,
//   remaining,
//   percentage,
//   status,
// }: {
//   contributed: number;
//   expected: number;
//   remaining: number;
//   percentage: number;
//   status: "COMPLETED" | "ON_TRACK" | "BEHIND";
// }) {
//   const statusColor = {
//     COMPLETED: "text-green-600",
//     ON_TRACK: "text-yellow-600",
//     BEHIND: "text-red-600",
//   }[status];

//   return (
//     <div className="rounded-xl border p-6 bg-white space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold">My Contribution</h3>
//         <span className={`text-xs font-semibold ${statusColor}`}>
//           {status.replace("_", " ")}
//         </span>
//       </div>

//       <Stat label="Contributed" value={`${contributed.toLocaleString()} FCFA`} />
//       <Stat label="Expected" value={`${expected.toLocaleString()} FCFA`} />
//       <Stat label="Remaining" value={`${remaining.toLocaleString()} FCFA`} />

//       <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
//         <div
//           className="h-full bg-destructive"
//           style={{ width: `${percentage}%` }}
//         />
//       </div>

//       <p className="text-xs text-gray-500">
//         {percentage.toFixed(1)}% completed
//       </p>
//     </div>
//   );
// }

// function Stat({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex justify-between text-sm">
//       <span className="text-gray-600">{label}</span>
//       <span className="font-medium">{value}</span>
//     </div>
//   );
// }


export default function MyContributionCard({
  contributed,
  expected,
  remaining,
  percentage,
  status,
}: {
  contributed: number;
  expected: number;
  remaining: number;
  percentage: number;
  status: "COMPLETED" | "ON_TRACK" | "BEHIND";
}) {
  const statusStyles = {
    COMPLETED: "bg-green-100 text-green-700",
    ON_TRACK: "bg-yellow-100 text-yellow-700",
    BEHIND: "bg-red-100 text-red-700",
  }[status];

  const progressGradient = {
    COMPLETED: "from-green-500 to-green-600",
    ON_TRACK: "from-yellow-500 to-yellow-600",
    BEHIND: "from-red-500 to-red-600",
  }[status];

  return (
    <div className="w-full rounded-2xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-sm p-4 sm:p-6 space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          My Contribution
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${statusStyles}`}
        >
          {status.replace("_", " ")}
        </span>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <Stat label="Contributed" value={`${contributed.toLocaleString()} FCFA`} />
        <Stat label="Expected" value={`${expected.toLocaleString()} FCFA`} />
        <Stat label="Remaining" value={`${remaining.toLocaleString()} FCFA`} />
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="w-full h-3 sm:h-4 bg-gray-200/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${progressGradient} transition-all duration-700 ease-out`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <p className="text-xs sm:text-sm text-gray-500 text-right">
          {percentage.toFixed(1)}% completed
        </p>
      </div>
    </div>
  );
}

/* ---------- Reusable Stat Row ---------- */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm sm:text-base">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}
