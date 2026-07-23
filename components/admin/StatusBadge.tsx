import { Badge } from "@chakra-ui/react";
import type { StatusConteudo } from "@prisma/client";

const LABELS: Record<StatusConteudo, string> = {
  RASCUNHO: "rascunho",
  REVISADO: "revisado",
  PUBLICADO: "publicado",
};

const SCHEME: Record<StatusConteudo, string> = {
  RASCUNHO: "gray",
  REVISADO: "warning",
  PUBLICADO: "safe",
};

export default function StatusBadge({ status }: { status: StatusConteudo }) {
  const scheme = SCHEME[status];
  const isSemantic = scheme === "safe" || scheme === "warning";

  return (
    <Badge
      px={2}
      py={0.5}
      fontSize="0.7rem"
      bg={isSemantic ? `${scheme}.bg` : undefined}
      color={isSemantic ? `${scheme}.text` : undefined}
      colorScheme={isSemantic ? undefined : "gray"}
    >
      {LABELS[status]}
    </Badge>
  );
}
