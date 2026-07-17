import { getSessionUser } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

// Layout do painel administrativo. A proteção de acesso em si é feita no
// middleware.ts (raiz do projeto); aqui só passamos a sessão para a casca
// visual (AdminShell) decidir o que exibir.

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return <AdminShell userEmail={user?.email}>{children}</AdminShell>;
}
