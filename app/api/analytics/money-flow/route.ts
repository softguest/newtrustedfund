import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { transactions } from "@/config/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const results = await db.execute(sql`
      SELECT
        EXTRACT(MONTH FROM created_at) AS month,
        SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) AS deposits,
        SUM(CASE WHEN type = 'withdrawal' THEN amount ELSE 0 END) AS withdrawals,
        SUM(CASE WHEN type = 'transfer' THEN amount ELSE 0 END) AS transfers
      FROM ${transactions}
      GROUP BY month
      ORDER BY month ASC;
    `);

    return NextResponse.json(results.rows);
  } catch (error) {
    console.error("Money flow error:", error);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
