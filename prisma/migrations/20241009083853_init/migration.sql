/*
  Warnings:

  - A unique constraint covering the columns `[userId,day,month,year]` on the table `MonthHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,month,year]` on the table `YearHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MonthHistory_userId_day_month_year_key" ON "MonthHistory"("userId", "day", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "YearHistory_userId_month_year_key" ON "YearHistory"("userId", "month", "year");
