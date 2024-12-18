/*
  Warnings:

  - You are about to drop the `Background` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Background" DROP CONSTRAINT "Background_image_url_id_fkey";

-- DropTable
DROP TABLE "Background";

-- CreateTable
CREATE TABLE "FeedBack" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "prompt_type" TEXT,
    "feed_count" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedBack_pkey" PRIMARY KEY ("id")
);
