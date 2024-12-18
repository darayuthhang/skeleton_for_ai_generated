/*
  Warnings:

  - Added the required column `description` to the `ImageUrl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta_description` to the `ImageUrl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageUrl" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "meta_description" TEXT NOT NULL;
