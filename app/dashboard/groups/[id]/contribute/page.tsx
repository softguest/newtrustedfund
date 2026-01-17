import { DashboardLayout } from "@/components/dashboard-layout";
import Contribute from "./Contribute";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <DashboardLayout>
      <Contribute groupId={id} />
    </DashboardLayout>
  );
}
