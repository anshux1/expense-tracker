/*
  Warnings:

  - Made the column `income` on table `YearHistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expense` on table `YearHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "YearHistory" ALTER COLUMN "income" SET NOT NULL,
ALTER COLUMN "expense" SET NOT NULL;
