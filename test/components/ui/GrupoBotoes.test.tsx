import { describe, expect, it, vi } from "vitest";
import { TbHome } from "react-icons/tb";
import { render, screen, setupUserEvent } from "@/test/test-utils";
import GrupoBotoes from "@/components/ui/GrupoBotoes";

const ITENS = [
  { valor: "a", label: "Opção A" },
  { valor: "b", label: "Opção B" },
  { valor: "c", label: "Opção C" },
];

describe("GrupoBotoes", () => {
  it("renderiza um botão por item e chama onSelecionar com o valor certo", async () => {
    const onSelecionar = vi.fn();
    const user = setupUserEvent();

    render(<GrupoBotoes itens={ITENS} ehSelecionado={() => false} onSelecionar={onSelecionar} />);

    await user.click(screen.getByRole("button", { name: "Opção B" }));

    expect(onSelecionar).toHaveBeenCalledWith("b");
  });

  it("reflete o item ativo via aria-pressed segundo ehSelecionado", () => {
    render(
      <GrupoBotoes itens={ITENS} ehSelecionado={(v) => v === "b"} onSelecionar={() => {}} />
    );

    expect(screen.getByRole("button", { name: "Opção A" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByRole("button", { name: "Opção B" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("renderiza o ícone quando informado, mantendo o nome acessível do botão", () => {
    render(
      <GrupoBotoes
        itens={[{ valor: "casa", label: "Em casa", icon: TbHome }]}
        ehSelecionado={() => false}
        onSelecionar={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: "Em casa" })).toBeInTheDocument();
  });
});
