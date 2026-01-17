"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

interface KYC {
  id: string;
  userId: string;
  idDocumentUrl?: string;
  addressProofUrl?: string;
  submittedAt: string;
  status: string;
  rejectionReason?: string;
}

export default function AdminKYCPage() {
  const [kycs, setKycs] = useState<KYC[]>([]);
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/kyc")
      .then(res => res.json())
      .then(setKycs);
  }, []);

  const handleReview = async (id: string, status: "approved" | "rejected") => {
    let rejectionReason;
    if (status === "rejected") {
      rejectionReason = prompt("Enter rejection reason:");
      if (!rejectionReason) return;
    }

    const adminId = "admin-uuid"; // replace with logged-in admin ID

    await fetch(`/api/admin/kyc/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, rejectionReason, adminId }),
    });

    setKycs(prev => prev.filter(k => k.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pending KYC Requests</h1>

      {kycs.length === 0 && <p className="text-gray-500">No pending KYCs</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kycs.map(k => (
          <div key={k.id} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-lg mb-2">User: {k.userId}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Submitted: {new Date(k.submittedAt).toLocaleString()}
              </p>
              <div className="flex gap-2">
                {k.idDocumentUrl && (
                  <button
                    className="text-blue-600 underline text-sm"
                    onClick={() => setModalUrl(k.idDocumentUrl ?? null)}
                  >
                    View ID
                  </button>
                )}
                {k.addressProofUrl && (
                  <button
                    className="text-blue-600 underline text-sm"
                    onClick={() => setModalUrl(k.addressProofUrl ?? null)}
                  >
                    View Address Proof
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                onClick={() => handleReview(k.id, "approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                onClick={() => handleReview(k.id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      <Dialog open={!!modalUrl} onClose={() => setModalUrl(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-3xl w-full p-4 relative">
            <button
              onClick={() => setModalUrl(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
            >
              ×
            </button>
            {modalUrl && (
              <img src={modalUrl} alt="Document Preview" className="w-full h-auto rounded" />
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
