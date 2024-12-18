/*
  Warnings:

  - You are about to drop the column `prompt` on the `GptPrompt` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `ImageUrl` table. All the data in the column will be lost.
  - Added the required column `domain_slug` to the `ImageUrl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompts` to the `ImageUrl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GptPrompt" DROP COLUMN "prompt";

-- AlterTable
ALTER TABLE "ImageUrl" DROP COLUMN "platform",
ADD COLUMN     "domain_slug" TEXT NOT NULL,
ADD COLUMN     "prompts" TEXT NOT NULL;
