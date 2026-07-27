import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import theme from "@/app/theme";

function AllProviders({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

function renderComTema(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// O @testing-library/user-event reinstala HTMLElement.prototype.focus/blur como
// getter-only toda vez que cria uma sessão (patchFocus, de propósito, pra simular
// foco/blur corretamente). Isso colide com o @zag-js/focus-visible do Chakra
// (usado por Checkbox/Radio/Switch), que tenta reatribuir essas propriedades —
// e quebra com "Cannot set property focus which has only a getter". Usar este
// helper em vez de userEvent.setup() direto reconverte pra uma propriedade
// gravável logo em seguida, preservando o comportamento do user-event.
function setupUserEvent() {
  const user = userEvent.setup();
  for (const prop of ["focus", "blur"] as const) {
    Object.defineProperty(HTMLElement.prototype, prop, {
      configurable: true,
      writable: true,
      value: HTMLElement.prototype[prop],
    });
  }
  return user;
}

export * from "@testing-library/react";
export { renderComTema as render, setupUserEvent };
