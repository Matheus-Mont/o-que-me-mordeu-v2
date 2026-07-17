import BotaoSOS from "@/components/emergencia/BotaoSOS";

// Route group (public) — telas do usuário final. O botão SOS flutuante
// fica aqui para aparecer sobre todas essas telas, isolado do painel
// administrativo (app/admin).

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BotaoSOS />
    </>
  );
}
