import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: false,
    // Vários arquivos rodam em paralelo por padrão, cada um com sua própria
    // instância de jsdom — mas pacotes de node_modules (ex.: o hasSetup
    // interno do @zag-js/focus-visible, usado pelo Checkbox do Chakra) podem
    // ficar em cache compartilhado entre arquivos no mesmo worker, causando
    // flakiness (passa isolado, falha ao rodar a suíte inteira). Rodar os
    // arquivos em sequência custa uns segundos a mais, mas garante
    // determinismo — importante justamente por isso ser o gate de CI.
    fileParallelism: false,
  },
});
