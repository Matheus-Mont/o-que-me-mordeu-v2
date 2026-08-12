import PageHeader from "@/components/layout/PageHeader";
import PageShell from "@/components/layout/PageShell";
import QuizCuriosidades from "@/components/curiosidades/QuizCuriosidades";

export const metadata = {
  title: "Quiz de curiosidades | O que me mordeu?",
};

export default function QuizCuriosidadesPage() {
  return (
    <PageShell maxW={{ base: "100%", md: "content" }}>
      <PageHeader title="Quiz de curiosidades" href="/curiosidades" />
      <QuizCuriosidades />
    </PageShell>
  );
}
