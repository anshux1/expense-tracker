import MonthlyHistoryChart from "@/components/history/MonthlyHistoryChart"
import YearlyHistoryChart from "@/components/history/YearlyHIstoryChart"

export const dynamic = "force-dynamic"
export default function HistoryPage() {
  return (
    <div className="max-w-screen-2xl px-4 mx-auto py-5">
      <h1 className="text-3xl font-bold mb-8">Financial History</h1>
      <div className="grid gap-6 grid-cols-1">
        <MonthlyHistoryChart />
        <YearlyHistoryChart />
      </div>
    </div>
  )
}
