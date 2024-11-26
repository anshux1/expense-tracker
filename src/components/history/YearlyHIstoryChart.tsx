"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useYearlyHistory } from "@/hooks/useYearlyHistory"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { z } from "zod"
import { Form } from "../ui/form"
import { SelectField } from "../common/FormFields"

const yearSelectSchema = z.object({
  yearValues: z.string()
    .min(2024, { message: "Year must be greater than 2024" })
    .max(new Date().getFullYear(), { message: "Year must be less than or equal to current year" }),
})

type YearSelectInput = z.infer<typeof yearSelectSchema>
export default function YearlyHistoryChart() {
  let currentYear = new Date().getFullYear()
  const years = [];
  while (currentYear >= 2024) {
    years.push(currentYear--)
  }
  const form = useForm<YearSelectInput>({
    resolver: zodResolver(yearSelectSchema),
    defaultValues: {
      yearValues: years[0].toString()
    }
  })
  const yearValue = form.watch("yearValues")
  const yearlyData = useYearlyHistory(yearValue)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Yearly Overview</CardTitle>
          <Form {...form}>
            <form className="flex flex-row space-x-2">
              <SelectField
                control={form.control}
                name="yearValues"
                options={years.map(year => ({ value: year.toString(), label: year.toString() }))}
              />
            </form>
          </Form>
        </div>
        <CardDescription>Monthly income and expenses</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            income: {
              label: "Income",
              color: "hsl(var(--chart-1))",
            },
            expense: {
              label: "Expense",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="var(--color-expense)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
