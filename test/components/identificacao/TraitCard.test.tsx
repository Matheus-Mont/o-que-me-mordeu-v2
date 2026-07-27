import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test/test-utils";
import TraitCard from "@/components/identificacao/TraitCard";

describe("TraitCard", () => {
  it("chama onToggle ao clicar", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <TraitCard
        label="cabeça triangular"
        descricao="cabeça em triângulo"
        selecionado={false}
        onToggle={onToggle}
      />
    );

    await user.click(screen.getByRole("checkbox"));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("reflete o estado selecionado em aria-checked", () => {
    const { rerender } = render(
      <TraitCard label="x" descricao="y" selecionado={false} onToggle={() => {}} />
    );
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "false");

    rerender(<TraitCard label="x" descricao="y" selecionado onToggle={() => {}} />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("mostra a imagem quando informada, e nenhuma imagem quando não", () => {
    const { rerender } = render(
      <TraitCard label="cobra" descricao="d" selecionado={false} onToggle={() => {}} />
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    rerender(
      <TraitCard
        label="cobra"
        descricao="d"
        imagem="/guia/cobra.jpg"
        selecionado={false}
        onToggle={() => {}}
      />
    );
    expect(screen.getByRole("img", { name: "cobra" })).toHaveAttribute("src", "/guia/cobra.jpg");
  });
});
