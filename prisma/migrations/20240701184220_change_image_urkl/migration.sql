/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `ImageUrl` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `ImageUrl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageUrl" DROP COLUMN "imageUrl",
ADD COLUMN     "image_url" TEXT NOT NULL;
