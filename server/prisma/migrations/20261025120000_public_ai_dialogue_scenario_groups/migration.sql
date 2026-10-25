BEGIN;

-- AlterTable
ALTER TABLE "AiDialogueScenario" ADD COLUMN     "cover_s3_key" TEXT,
ADD COLUMN     "group_id" INTEGER;

-- CreateTable
CREATE TABLE "AiDialogueScenarioGroup" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueScenarioGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueScenarioGroup_slug_key" ON "AiDialogueScenarioGroup"("slug");

-- CreateIndex
CREATE INDEX "AiDialogueScenarioGroup_created_at_id_idx" ON "AiDialogueScenarioGroup"("created_at", "id");

-- CreateIndex
CREATE INDEX "AiDialogueScenario_group_id_created_at_id_idx" ON "AiDialogueScenario"("group_id", "created_at", "id");

-- AddForeignKey
ALTER TABLE "AiDialogueScenario" ADD CONSTRAINT "AiDialogueScenario_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "AiDialogueScenarioGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Preserve the existing scenarios and dialogue IDs while introducing the required relation.
INSERT INTO "AiDialogueScenarioGroup" ("slug", "title") VALUES
('travel-abroad', '{"en":"Travel abroad","es":"Viajar al extranjero","fr":"Voyager à l’étranger","de":"Reisen ins Ausland","it":"Viaggiare all’estero","tr":"Yurt dışı seyahati","ru":"Поездка за границу"}'),
('food-and-shopping', '{"en":"Food and shopping","es":"Comida y compras","fr":"Repas et achats","de":"Essen und Einkaufen","it":"Cibo e acquisti","tr":"Yemek ve alışveriş","ru":"Еда и покупки"}'),
('city-and-services', '{"en":"City and services","es":"Ciudad y servicios","fr":"Ville et services","de":"Stadt und Dienstleistungen","it":"Città e servizi","tr":"Şehir ve hizmetler","ru":"Город и услуги"}'),
('home-and-everyday-life', '{"en":"Home and everyday life","es":"Hogar y vida cotidiana","fr":"Maison et vie quotidienne","de":"Zuhause und Alltag","it":"Casa e vita quotidiana","tr":"Ev ve günlük yaşam","ru":"Дом и повседневная жизнь"}');

-- SQL migrations do not know application MODE. Bootstrap synchronization replaces these
-- temporary keys with covers/<mode>/<slug>.webp before the HTTP server starts listening.
UPDATE "AiDialogueScenario" AS scenario
SET "group_id" = scenario_group."id",
    "cover_s3_key" = 'ai-dialogue-public-scenarios/covers/_seed-pending/' || scenario."slug" || '.webp'
FROM "AiDialogueScenarioGroup" AS scenario_group
WHERE scenario."user_id" IS NULL
  AND scenario_group."slug" = CASE scenario."slug"
      WHEN 'passport-control' THEN 'travel-abroad'
      WHEN 'at-the-dentist' THEN 'city-and-services'
      WHEN 'pool-membership' THEN 'city-and-services'
      WHEN 'knock-at-the-door' THEN 'home-and-everyday-life'
  END;

-- Public scenarios require a group, a slug and a nonblank cover key.
-- User-owned scenarios are never grouped; their covers remain optional.
ALTER TABLE "AiDialogueScenario"
ADD CONSTRAINT "AiDialogueScenario_public_group_cover_check" CHECK (
    ("user_id" IS NULL
        AND "group_id" IS NOT NULL
        AND "slug" IS NOT NULL AND length(btrim("slug")) > 0
        AND "cover_s3_key" IS NOT NULL AND length(btrim("cover_s3_key")) > 0)
    OR ("user_id" IS NOT NULL AND "group_id" IS NULL)
);

COMMIT;
