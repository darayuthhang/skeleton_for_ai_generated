/*
  Warnings:

  - You are about to drop the `FeedBack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FeedBack";

-- CreateTable
CREATE TABLE "CollectData" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "prompt_type" TEXT,
    "feed_count" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectData_pkey" PRIMARY KEY ("id")
);
