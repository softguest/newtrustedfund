"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  data: any[];
}

export default function UsersTable({ data }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>KYC</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.fullName}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.phone}</TableCell>
            <TableCell>
              <span
                className={
                  u.status === "active"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {u.status}
              </span>
            </TableCell>
            <TableCell>{u.kycStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
