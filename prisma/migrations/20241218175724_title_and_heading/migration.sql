/*
  Warnings:

  - You are about to drop the column `prompts` on the `ImageUrl` table. All the data in the column will be lost.
  - Added the required column `title_and_heading` to the `ImageUrl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageUrl" DROP COLUMN "prompts",
ADD COLUMN     "title_and_heading" TEXT NOT NULL;
