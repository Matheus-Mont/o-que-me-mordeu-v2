import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

const { default: EmergenciaPage } = await import("@/app/(public)/emergencia/page");

describe("EmergenciaPage", () => {
  it("mostra os telefones de emergência e o link pra soro", () => {
    render(<EmergenciaPage />);

    expect(screen.getByText("SAMU")).toBeInTheDocument();
    expect(screen.getByText("192")).toBeInTheDocument();
    expect(screen.getByText("Bombeiros")).toBeInTheDocument();
    expect(screen.getByText("193")).toBeInTheDocument();

    const linkSamu = screen.getByText("SAMU").closest("a");
    expect(linkSamu).toHaveAttribute("href", "tel:192");

    const linkSoro = screen.getByRole("link", { name: "Encontrar hospital com soro" });
    expect(linkSoro).toHaveAttribute("href", "https://soroja.com.br/");
    expect(linkSoro).toHaveAttribute("target", "_blank");
  });

  it("mostra o link pra quem já sabe o tipo de animal", () => {
    render(<EmergenciaPage />);

    const link = screen.getByRole("link", { name: "Sei que tipo de animal foi" });
    expect(link).toHaveAttribute("href", "/identificar");
  });
});
