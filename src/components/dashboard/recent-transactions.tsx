'use client'
import React from "react"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "../ui/card"
import { useRecoilValue } from "recoil"
import { TransactionAtom, TransactionState } from "@/store/transactions"

export default function RecentTransaction() {
  const transactions = useRecoilValue(TransactionAtom)
  const last5Transactions = transactions?.slice(-5).reverse()
  console.log("last5Transactions", last5Transactions)
  return (
    <Card className="col-span-5 md:col-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Last 5 transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {last5Transactions?.length ? (last5Transactions?.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))) : (
            <p className="text-center">No Transactions</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const TransactionCard = ({ transaction }: { transaction: TransactionState }) => {
  return (
    <div className="flex items-center">
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{transaction.description}</p>
        <p className="text-sm text-muted-foreground">Category: {transaction.category}</p>
      </div>
      <div className={`ml-auto ${transaction.type === "INCOME" ? "text-green-500" : "text-red-500"} font-medium`}>${transaction.amount}</div>
    </div>
  )
}
