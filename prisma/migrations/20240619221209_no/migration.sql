-- CreateTable
CREATE TABLE "GptPrompt" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "prompt" TEXT,
    "image_url" TEXT,
    "account_type" TEXT,
    "has_access" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GptPrompt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GptPrompt" ADD CONSTRAINT "GptPrompt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
