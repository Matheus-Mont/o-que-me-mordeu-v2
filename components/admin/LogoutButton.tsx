"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [saindo, setSaindo] = useState(false);

  async function handleLogout() {
    setSaindo(true);
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button onClick={handleLogout} isLoading={saindo} loadingText="saindo..." variant="ghost" size="sm">
      sair
    </Button>
  );
}
