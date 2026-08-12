import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

const { default: QuizCuriosidadesPage } = await import("@/app/(public)/curiosidades/quiz/page");

describe("QuizCuriosidadesPage", () => {
  it("mostra o cabeçalho e a primeira pergunta do quiz", () => {
    render(<QuizCuriosidadesPage />);

    expect(screen.getByRole("heading", { name: "Quiz de curiosidades" })).toBeInTheDocument();
    expect(screen.getByText(/Pergunta 1 de 10/)).toBeInTheDocument();
  });
});
