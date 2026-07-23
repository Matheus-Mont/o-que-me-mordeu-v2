-- Substitui o campo único "imagemUrl" por uma lista "imagens" (carrossel de
-- fotos/ângulos na ficha do animal). Preserva dados existentes: quem já
-- tinha uma foto cadastrada passa a ter essa mesma foto como o único item
-- da lista.

-- AddColumn
ALTER TABLE "animais" ADD COLUMN "imagens" TEXT[] NOT NULL DEFAULT '{}';

-- Migra o valor antigo de imagemUrl (se houver) para o novo array
UPDATE "animais"
SET "imagens" = ARRAY["imagemUrl"]
WHERE "imagemUrl" IS NOT NULL;

-- DropColumn
ALTER TABLE "animais" DROP COLUMN "imagemUrl";
