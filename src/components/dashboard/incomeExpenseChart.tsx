'use client'
import React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card"
import { BarChart as BarChartTremor } from "../ui/bar-chart"
import { useLast10DaysHistory } from "@/hooks/useLast10DaysData"

export default function IncomeExpenseChart() {
  const last10DaysHistory = useLast10DaysHistory()
  console.log(last10DaysHistory)
  return (
    <Card className="col-span-5">
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
        <CardDescription>{`You made $${last10DaysHistory.income.toFixed(2)} in income and $${last10DaysHistory.expense.toFixed(2)} in expenses in last 10 days.`}</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <BarChartTremor
          className="h-80"
          data={last10DaysHistory.data}
          index="date"
          allowDecimals={true}
          categories={["expense", "income"]}
          valueFormatter={(number: number) =>
            `$${Intl.NumberFormat("us").format(number).toString()}`
          }
          onValueChange={(v) => console.log(v)}
        />
      </CardContent>
    </Card>
  )
}
