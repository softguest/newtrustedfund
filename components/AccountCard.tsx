"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


export function AccountCard({ title, balance }: { title: string; balance: number }) {
  return (
    <Card className="shadow-lg bg-destructive">
      <CardHeader>
        <CardTitle className="text-lg text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-white">XAF {balance.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
