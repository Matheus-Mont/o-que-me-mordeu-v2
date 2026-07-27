import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/test-utils";
import { TbBook2 } from "react-icons/tb";
import NavCard from "@/components/layout/NavCard";

describe("NavCard", () => {
  it("renderiza título, subtítulo e href", () => {
    render(
      <NavCard
        href="/catalogo"
        title="Explorar o catálogo"
        subtitle="Compare a aparência e as características das espécies."
      />
    );

    const link = screen.getByRole("link", { name: /Explorar o catálogo/ });
    expect(link).toHaveAttribute("href", "/catalogo");
    expect(screen.getByText("Compare a aparência e as características das espécies.")).toBeInTheDocument();
  });

  it("só renderiza o ícone quando a prop icon é passada", () => {
    const { container, rerender } = render(
      <NavCard href="/x" title="t" subtitle="s" />
    );
    expect(container.querySelector("svg")).not.toBeInTheDocument();

    rerender(<NavCard href="/x" title="t" subtitle="s" icon={TbBook2} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("só renderiza a seta quando showArrow é true", () => {
    const { container, rerender } = render(
      <NavCard href="/x" title="t" subtitle="s" icon={TbBook2} />
    );
    // com só o ícone, deve haver exatamente 1 svg (o do ícone)
    expect(container.querySelectorAll("svg")).toHaveLength(1);

    rerender(<NavCard href="/x" title="t" subtitle="s" icon={TbBook2} showArrow />);
    // com ícone + seta, 2 svgs
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });
});
