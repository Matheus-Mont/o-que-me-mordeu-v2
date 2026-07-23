import { getSessionUser } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return <AdminShell userEmail={user?.email}>{children}</AdminShell>;
}
