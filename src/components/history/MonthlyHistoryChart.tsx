"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useMonthHistory } from "@/hooks/useMonthHIstory"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { SelectField } from "../common/FormFields"

const AllMonths: [string, ...string[]] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]
const monthSelectSchema = z.object({
  yearValues: z.string()
    .min(2024, { message: "Year must be greater than 2024" })
    .max(new Date().getFullYear(), { message: "Year must be less than or equal to current year" }),
  monthValues: z.string({ message: "Invalid month" })
})

type MonthSelectSchema = z.infer<typeof monthSelectSchema>

export default function MonthlylyHistoryChart() {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const years = [];
  let year = currentYear;
  while (year >= 2024) {
    years.push(year--);
  }
  const months = AllMonths.map((month, index) => {
    if (index > currentMonth) return null;
    return { value: index.toString(), label: month }
  }).filter(Boolean) as { value: string, label: string }[];

  const form = useForm<MonthSelectSchema>({
    resolver: zodResolver(monthSelectSchema),
    defaultValues: {
      yearValues: years[0].toString(),
      monthValues: currentMonth.toString()
    }
  })
  const monthValue = form.watch("monthValues");
  const yearValue = form.watch("yearValues");
  const monthData = useMonthHistory(yearValue.toString(), monthValue);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Monthly Overview</CardTitle>
          <Form {...form}>
            <form className="flex flex-row space-x-2">
              <SelectField
                control={form.control}
                name="monthValues"
                options={months}
              />
              <SelectField
                control={form.control}
                name="yearValues"
                options={years.map(year => ({ value: year.toString(), label: year.toString() }))}
              />
            </form>
          </Form>
        </div>
        <CardDescription>Daily income and expenses</CardDescription>
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
          className="h-[300px] p-0 m-0 w-full"
        >
          <ResponsiveContainer width="95%" height="100%" className="pr-4 pl-0 ml-0">
            <LineChart data={monthData} margin={{ top: 0, right: 0, left: -5, bottom: 0 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="income" stroke="var(--color-income)" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="var(--color-expense)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
