-- CreateTable
CREATE TABLE "FreeColorPageImageUrl" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title_and_heading" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "domain_slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "alt_text" TEXT,
    "category" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FreeColorPageImageUrl_pkey" PRIMARY KEY ("id")
);
