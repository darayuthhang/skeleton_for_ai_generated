/*
  Warnings:

  - You are about to drop the column `image_list_url` on the `GptPrompt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GptPrompt" DROP COLUMN "image_list_url";

-- CreateTable
CREATE TABLE "ImageUrl" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "platform" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "gpt_prompt_id" UUID NOT NULL,

    CONSTRAINT "ImageUrl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageUrl" ADD CONSTRAINT "ImageUrl_gpt_prompt_id_fkey" FOREIGN KEY ("gpt_prompt_id") REFERENCES "GptPrompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
