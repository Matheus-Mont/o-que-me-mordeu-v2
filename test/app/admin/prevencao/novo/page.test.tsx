import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

const { default: NovaDicaPage } = await import("@/app/admin/prevencao/novo/page");

describe("NovaDicaPage", () => {
  it("renderiza o formulário em branco, no modo de criação", () => {
    render(<NovaDicaPage />);

    expect(screen.getByRole("heading", { name: "nova dica de prevenção" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^ícone/i)).toHaveValue("");
    expect(screen.getByRole("button", { name: "criar rascunho" })).toBeInTheDocument();
  });
});
