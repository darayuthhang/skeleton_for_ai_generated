/*
  Warnings:

  - You are about to drop the column `gpt_prompt_id` on the `ImageUrl` table. All the data in the column will be lost.
  - You are about to drop the `GptPrompt` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `ImageUrl` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GptPrompt" DROP CONSTRAINT "GptPrompt_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ImageUrl" DROP CONSTRAINT "ImageUrl_gpt_prompt_id_fkey";

-- AlterTable
ALTER TABLE "ImageUrl" DROP COLUMN "gpt_prompt_id",
ADD COLUMN     "has_access" BOOLEAN DEFAULT false,
ADD COLUMN     "user_id" UUID NOT NULL;

-- DropTable
DROP TABLE "GptPrompt";

-- AddForeignKey
ALTER TABLE "ImageUrl" ADD CONSTRAINT "ImageUrl_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
