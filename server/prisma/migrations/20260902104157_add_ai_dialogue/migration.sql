-- CreateTable
CREATE TABLE "AiDialogue" (
    "id" SERIAL NOT NULL,
    "scenario_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiDialogue_user_id_idx" ON "AiDialogue"("user_id");

-- CreateIndex
CREATE INDEX "AiDialogue_scenario_id_idx" ON "AiDialogue"("scenario_id");

-- AddForeignKey
ALTER TABLE "AiDialogue" ADD CONSTRAINT "AiDialogue_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "AiDialogueScenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogue" ADD CONSTRAINT "AiDialogue_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
