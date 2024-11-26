import React from "react"
import DashboardHeader from "@/components/dashboard/header"
import Analytics from "@/components/dashboard/analytics"
import IncomeExpenseChart from "@/components/dashboard/incomeExpenseChart"
import RecentTransaction from "@/components/dashboard/recent-transactions"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl flex-col md:flex mx-auto">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader />
        <Analytics />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <IncomeExpenseChart />
          <RecentTransaction />
        </div>
      </div>
    </div>
  )
}
