-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "measures" (
    "id" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "measure_type" "MeasureType" NOT NULL,
    "measure_value" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "measures_customer_code_key" ON "measures"("customer_code");
