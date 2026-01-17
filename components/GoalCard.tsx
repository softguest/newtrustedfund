"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function GoalCard({ goal }: { goal: any }) {
  const progress =
    goal.goalAmount > 0
      ? (Number(goal.balance) / Number(goal.goalAmount)) * 100
      : 0;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{goal.title || "Target Goal"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold mb-2">
          XAF {Number(goal.balance).toLocaleString()} /{" "}
          {Number(goal.goalAmount).toLocaleString()}
        </p>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}
