import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

const { default: NovoAnimalPage } = await import("@/app/admin/animais/novo/page");

describe("NovoAnimalPage", () => {
  it("renderiza o formulário em branco, no modo de criação", () => {
    render(<NovoAnimalPage />);

    expect(screen.getByRole("heading", { name: "novo animal" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^slug/i)).toHaveValue("");
    expect(screen.getByLabelText(/^slug/i)).toBeEnabled(); // só é desabilitado ao editar
    expect(screen.getByRole("button", { name: "criar rascunho" })).toBeInTheDocument();
  });
});
