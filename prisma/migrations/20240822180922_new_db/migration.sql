/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SearchRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SearchRequest" DROP CONSTRAINT "SearchRequest_user_id_fkey";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "SearchRequest";
