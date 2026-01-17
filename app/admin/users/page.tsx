import { db } from "@/config/db";
import { users } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UsersTable from "@/components/admin/UsersTable";

export default async function AdminUsersPage() {
  // 1️⃣ Check admin
  const authUser = await currentUser();

//   if (!authUser || authUser.publicMetadata.role !== "admin") {
//     redirect("/"); // protect the page
//   }

  // 2️⃣ Fetch all users
  const allUsers = await db.select().from(users);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <UsersTable data={allUsers} />
    </div>
  );
}
