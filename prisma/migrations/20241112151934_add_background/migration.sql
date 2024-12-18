-- CreateTable
CREATE TABLE "Background" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "image_url_id" UUID,
    "inngest_event_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Background_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Background_image_url_id_key" ON "Background"("image_url_id");

-- AddForeignKey
ALTER TABLE "Background" ADD CONSTRAINT "Background_image_url_id_fkey" FOREIGN KEY ("image_url_id") REFERENCES "ImageUrl"("id") ON DELETE SET NULL ON UPDATE CASCADE;
