import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboardtwo/DashboardShell";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // 🚫 Not authenticated → redirect
  if (!userId) {
    redirect("/sign-in");
  }

  // ✅ Authenticated → render client shell
  return <DashboardShell>{children}</DashboardShell>;
}
