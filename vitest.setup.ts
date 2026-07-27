import "@testing-library/jest-dom/vitest";

// jsdom não implementa scrollTo (nem em Element, nem em Window) — o Menu do
// Chakra chama Element.scrollTo ao abrir (pra rolar até a opção ativa) e
// algumas páginas chamam window.scrollTo ao trocar de etapa/rota. Sem isso,
// o primeiro quebra com TypeError e o segundo só polui o log ("Not
// implemented: ...").
if (typeof Element !== "undefined" && !Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}
if (typeof window !== "undefined") {
  window.scrollTo = () => {};
}

// Nota sobre o Checkbox/Radio/Switch do Chakra + user-event: ver
// setupUserEvent() em test/test-utils.tsx — o @testing-library/user-event
// reinstala HTMLElement.prototype.focus/blur como getter-only de propósito,
// o que colide com o @zag-js/focus-visible desses componentes. Use
// setupUserEvent() no lugar de userEvent.setup() em testes que interagem
// com esses componentes.
