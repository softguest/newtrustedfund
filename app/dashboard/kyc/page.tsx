"use client";

import { useState } from "react";

export default function KycPage() {
  const [loading, setLoading] = useState(false);

  async function submitKyc(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/kyc", {
      method: "POST",
      body: form,
    });

    setLoading(false);
    alert("KYC submitted!");
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">KYC Verification</h1>

      <form onSubmit={submitKyc} className="space-y-4">
        <div>
          <label className="block mb-1">ID Document</label>
          <input type="file" name="idDocument" required className="w-full" />
        </div>

        <div>
          <label className="block mb-1">Proof of Address</label>
          <input type="file" name="addressProof" required className="w-full" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {loading ? "Uploading..." : "Submit KYC"}
        </button>
      </form>
    </div>
  );
}
