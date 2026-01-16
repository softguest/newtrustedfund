// lib/momo.ts
import fetch from "node-fetch";

const MOMO_ENV = process.env.MOMO_ENV ?? "sandbox";
const MOMO_BASE = process.env.MOMO_BASE_URL ?? "https://sandbox.momodeveloper.mtn.com"; // replace as needed
const MOMO_USER = process.env.MOMO_USER ?? "";
const MOMO_APIKEY = process.env.MOMO_APIKEY ?? "";
const MOMO_PROVIDER_KEY = process.env.MOMO_PROVIDER_KEY ?? ""; // some flows require provider key
const MOMO_SUBSCRIPTION_KEY = process.env.MOMO_SUBSCRIPTION_KEY ?? "";

export async function getAccessToken(): Promise<string | null> {
  const tokenEndpoint = `${MOMO_BASE}/disbursement/token/`;

  try {
    const resp = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${MOMO_USER}:${MOMO_APIKEY}`).toString("base64")}`,
        "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
      },
    });

    if (!resp.ok) {
      console.error("Token fetch failed", await resp.text());
      return null;
    }

    // 👇 Tell TS what shape to expect
    const body = (await resp.json()) as { access_token?: string; expires_in?: number };


    return body.access_token ?? null;
  } catch (err) {
    console.error("Error fetching token", err);
    return null;
  }
}


export async function initiateDisbursement(opts: {
  token: string;
  amount: number;
  phoneNumber: string;
  externalId: string | number;
  narration?: string;
}) {
  // Example for disbursement (transfer to MSISDN). Endpoint and body will depend on the MoMo product.
  // Replace path with the provider's disbursement path you're using.
  const { token, amount, phoneNumber, externalId, narration } = opts;

  const endpoint = `${MOMO_BASE}/disbursement/v1_0/transfer`;

  const body = {
    amount: amount.toString(),
    currency: "USD", // or local currency like XAF — set appropriately
    externalId: externalId.toString(),
    payee: {
      partyIdType: "MSISDN",
      partyId: phoneNumber,
    },
    payerMessage: narration ?? "Withdrawal",
    payeeNote: narration ?? "Withdrawal",
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Reference-Id": externalId.toString(),
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json().catch(() => null);
    return { status: res.status, ok: res.ok, data: json };
  } catch (err) {
    console.error("initiateDisbursement error", err);
    return { status: 500, ok: false, error: String(err) };
  }
}
