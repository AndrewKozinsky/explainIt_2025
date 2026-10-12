-- Keep a saved custom photo while a shared preset is selected.
ALTER TABLE "User" DROP CONSTRAINT "User_avatar_source_check";
ALTER TABLE "User" ADD CONSTRAINT "User_avatar_source_check" CHECK (
    ("avatar_preset_id" IS NOT NULL OR "avatar_s3_key" IS NOT NULL)
    AND ("avatar_preset_id" IS NULL OR "avatar_preset_id" IN ('male-1', 'male-2', 'female-1', 'female-2'))
    AND ("avatar_s3_key" IS NULL OR "avatar_s3_key" <> '')
);
