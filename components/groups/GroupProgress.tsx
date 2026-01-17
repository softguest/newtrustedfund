// export default function GroupProgress({
//   goal,
//   raised,
// }: {
//   goal: number;
//   raised: number;
// }) {
//   const percent = Math.min((raised / goal) * 100, 100);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h3 className="text-lg font-semibold">Group Contribution Progress</h3>
//       <hr className="my-2" />
//       <p className="font-medium my-4 font-xl">
//         Raised Funds
//       </p>
//       <p className="font-medium my-4 text-[24px] md:text-4xl">
//         <strong>{raised.toLocaleString()}</strong> / {goal.toLocaleString()} XAF
//       </p>
//       <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
//         <div
//           className="bg-destructive h-4 rounded-full"
//           style={{ width: `${percent}%` }}
//         />
//       </div>

//       <p className="text-sm text-gray-500 mt-1">
//         {percent.toFixed(1)}% completed
//       </p>
//     </div>
//   );
// }


export default function GroupProgress({
  goal,
  raised,
}: {
  goal: number;
  raised: number;
}) {
  const percent = Math.min((raised / goal) * 100, 100);

  return (
    <div className="w-full rounded-2xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-sm p-4 sm:p-6 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Group Contribution Progress
        </h3>
        <span className="text-xs sm:text-sm font-medium text-gray-500">
          {percent.toFixed(1)}%
        </span>
      </div>

      {/* Amounts */}
      <div className="space-y-1">
        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
          Raised Funds
        </p>
        <p className="text-xl sm:text-3xl font-bold text-gray-900">
          {raised.toLocaleString()}{" "}
          <span className="text-sm sm:text-base font-medium text-gray-500">
            / {goal.toLocaleString()} XAF
          </span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 sm:h-4 bg-gray-200/60 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Footer */}
      <p className="text-xs sm:text-sm text-gray-500">
        {percent >= 100
          ? "Goal reached 🎉"
          : `${percent.toFixed(1)}% of group goal completed`}
      </p>
    </div>
  );
}
