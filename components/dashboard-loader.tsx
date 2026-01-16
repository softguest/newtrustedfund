"use client"

export default function DashboardLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-zinc-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Logo image with rotation */}
          <img
            src="/images/20251229-101310.png"
            alt="CSTrustFunds"
            className="w-full h-full object-contain animate-spin"
            style={{ animationDuration: "2s" }}
          />

          {/* Circle spinner with fading tail */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 border-r-red-400 animate-spin"
            style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
          ></div>
        </div>

        <div className="mt-8 h-8 flex items-center justify-center overflow-hidden">
          <div
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 animate-pulse"
            style={{
              animation: "spinningText 3s ease-in-out infinite",
            }}
          >
            CSTRUSTFUNDS
          </div>
        </div>

        <p className="mt-4 text-zinc-500 text-sm">Loading your dashboard...</p>
      </div>

      <style>{`
        @keyframes spinningText {
          0% {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: rotate(180deg) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
