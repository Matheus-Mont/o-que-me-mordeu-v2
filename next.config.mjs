/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Tanto @chakra-ui/react quanto react-icons/tb são "barris" gigantes:
    // um único módulo que re-exporta centenas (Chakra) ou milhares
    // (react-icons) de nomes. Sem isto, cada arquivo que faz
    // `import { Box } from "@chakra-ui/react"` obriga o bundler a processar o
    // barril inteiro em dev — o principal motivo da compilação lenta. Com
    // optimizePackageImports, o Next reescreve para importar só o que é usado.
    // (@chakra-ui/react NÃO está na lista otimizada por padrão do Next 14.)
    optimizePackageImports: ["@chakra-ui/react", "react-icons"],
  },
};

export default nextConfig;
