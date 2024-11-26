'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, DollarSign, ArrowDownIcon, LucideProps, TrendingUp } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import useRangeData from "@/hooks/useRangeData"
import { useRecoilValue } from "recoil"
import { analyticsRangeAtom } from "@/store/analyticsRange"
import { cn } from "@/lib/utils"
export default function Analytics() {
  const selectedRange = useRecoilValue(analyticsRangeAtom)
  const data = useRangeData()
  const cards = [
    {
      title: `${selectedRange.label} Balance`,
      value: `$${data?.totalBalance.toFixed(2)}`,
      Icon: DollarSign,
      className: "text-green-500/90"
    },
    {
      title: `${selectedRange.label} Income`,
      value: `$${data?.totalIncome.toFixed(2)}`,
      description: `Most Income: ${data?.mostIncomeDay.amount} on ${data?.mostIncomeDay.date}`,
      Icon: ArrowUpIcon,
      className: "text-green-500/90"
    },
    {
      title: `${selectedRange.label} Expenses`,
      value: `$${data?.totalExpense.toFixed(2)}`,
      description: `Most Expense: ${data?.mostExpenseDay.amount} on ${data?.mostExpenseDay.date}`,
      Icon: ArrowDownIcon,
      className: "text-red-500/90"
    },
    {
      title: "Most Expensive Category",
      value: data?.mostExpensiveCategory.amount,
      description: data?.mostExpensiveCategory.category,
      Icon: TrendingUp,
      className: "text-red-500/90"
    },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <AnaliyticsCard
          className={card.className}
          key={index}
          title={card.title}
          value={card.value}
          description={card.description}
          Icon={card.Icon}
        />
      ))}
    </div>
  )
}

const AnaliyticsCard = ({
  title,
  description,
  value,
  Icon,
  className
}: {
  title: string,
  description?: string,
  value: string | number | undefined,
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
  className?: string
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn('text-sm font-medium', className)}>{title}</CardTitle>
        <Icon className={cn("h-4 w-4", `${className}/70`)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
