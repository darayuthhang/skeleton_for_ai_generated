/*
  Warnings:

  - You are about to drop the column `category` on the `ImageUrl` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `ImageUrl` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `ImageUrl` table. All the data in the column will be lost.
  - You are about to drop the column `three_d_model` on the `ImageUrl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ImageUrl" DROP COLUMN "category",
DROP COLUMN "industry",
DROP COLUMN "style",
DROP COLUMN "three_d_model";
