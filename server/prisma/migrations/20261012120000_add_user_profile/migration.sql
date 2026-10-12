CREATE TYPE "UserGender" AS ENUM ('MALE', 'FEMALE');

ALTER TABLE "User"
    ADD COLUMN "avatar_preset_id" TEXT DEFAULT 'male-1',
    ADD COLUMN "avatar_s3_key" TEXT,
    ADD COLUMN "gender" "UserGender" NOT NULL DEFAULT 'MALE';

-- A user always has either a shared preset or a custom photo, never both.
ALTER TABLE "User" ADD CONSTRAINT "User_avatar_source_check" CHECK (
    ("avatar_preset_id" IS NOT NULL) <> ("avatar_s3_key" IS NOT NULL)
    AND ("avatar_preset_id" IS NULL OR "avatar_preset_id" IN ('male-1', 'male-2', 'female-1', 'female-2'))
    AND ("avatar_s3_key" IS NULL OR "avatar_s3_key" <> '')
);
