import { TransactionDialog } from "../transactions/transactionDialog"
import SelectAnalyticsRange from "./selectAnalyticsRange"

export default function DashboardHeader() {
  return (
    <div className="flex sm:items-center justify-between flex-col sm:flex-row space-y-5 md:space-y-2">
      <div className="flex items-center justify-between space-x-2">
        <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
        <div className="sm:hidden">
          <SelectAnalyticsRange />
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <div className="hidden sm:block">
          <SelectAnalyticsRange />
        </div>
        <TransactionDialog TriggerButtonText="Add Expense" transactionType="EXPENSE" />
        <TransactionDialog TriggerButtonText="Add Income" transactionType="INCOME" />
      </div>
    </div>
  )
}
