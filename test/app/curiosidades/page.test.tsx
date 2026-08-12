import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

const { default: CuriosidadesPage } = await import("@/app/(public)/curiosidades/page");

describe("CuriosidadesPage", () => {
  it("mostra as duas opções: jogar o quiz e ler as curiosidades", () => {
    render(<CuriosidadesPage />);

    const linkQuiz = screen.getByRole("link", { name: /Jogar o quiz/ });
    expect(linkQuiz).toHaveAttribute("href", "/curiosidades/quiz");

    const linkLer = screen.getByRole("link", { name: /Ler as curiosidades/ });
    expect(linkLer).toHaveAttribute("href", "/curiosidades/ler");
  });
});
