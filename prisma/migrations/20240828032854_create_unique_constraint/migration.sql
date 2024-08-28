/*
  Warnings:

  - A unique constraint covering the columns `[customer_code,measure_type,measure_datetime]` on the table `measures` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "measures_customer_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "measures_customer_code_measure_type_measure_datetime_key" ON "measures"("customer_code", "measure_type", "measure_datetime");
