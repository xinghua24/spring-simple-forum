CREATE TABLE "post" (
    "id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "created" TIMESTAMPTZ(6),
    "updated" TIMESTAMPTZ(6),

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);
