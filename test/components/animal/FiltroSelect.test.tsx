import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test/test-utils";
import FiltroSelect from "@/components/animal/FiltroSelect";

const OPCOES = [
  { valor: "", label: "Todos" },
  { valor: "COBRA", label: "Cobras" },
  { valor: "ARANHA", label: "Aranhas" },
];

describe("FiltroSelect", () => {
  it("mostra o rótulo e a opção selecionada no botão", () => {
    render(<FiltroSelect rotulo="Animal" valor="COBRA" opcoes={OPCOES} onChange={() => {}} />);

    expect(screen.getByRole("button", { name: /Animal[\s\S]*Cobras/ })).toBeInTheDocument();
  });

  it("chama onChange com o valor da opção clicada", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<FiltroSelect rotulo="Animal" valor="" opcoes={OPCOES} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: /Animal/ }));
    await user.click(await screen.findByRole("menuitemradio", { name: "Cobras" }));

    expect(onChange).toHaveBeenCalledWith("COBRA");
  });
});
