'use client'

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRecoilValue } from "recoil"
import { TransactionAtom, TransactionState } from "@/store/transactions"
import { analyticsRangeAtom } from "@/store/analyticsRange"

type DayData = {
  date: Date;
  amount: number;
}
export default function useRangeData() {
  const selectedRange = useRecoilValue(analyticsRangeAtom)
  const TransactionsData = useRecoilValue(TransactionAtom)
  const [data, setData] = useState<TransactionState[]>([])
  const getHighestCategory = useCallback((data: Map<string, number>) => {
    return Array.from(data.entries()).reduce((mostExpensive, [category, amount]) => {
      return amount > mostExpensive.amount ? { category, amount } : mostExpensive;
    }, { category: '', amount: 0 });
  }, [])

  const { totalBalance, totalIncome, totalExpense, mostExpensiveCategory, mostIncomeCategory, mostIncomeDay, mostExpenseDay } = useMemo(() => {
    const expenseCategoryData = new Map<string, number>()
    const incomeCategoryData = new Map<string, number>()

    let totalIncome = 0;
    let totalExpense = 0;
    let mostIncomeDay: DayData = { date: new Date(), amount: 0 };
    let mostExpenseDay: DayData = { date: new Date(), amount: 0 };
    data.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      if (transaction.type === "EXPENSE") {
        totalExpense += transaction.amount
        expenseCategoryData
          .set(transaction.category, (expenseCategoryData.get(transaction.category) || 0) + transaction.amount)
        if (transaction.amount > mostExpenseDay.amount) {
          mostExpenseDay = { date: transactionDate, amount: transaction.amount }
        }
      } else {
        totalIncome += transaction.amount
        incomeCategoryData
          .set(transaction.category, (incomeCategoryData.get(transaction.category) || 0) + transaction.amount)
        if (transaction.amount > mostIncomeDay.amount) {
          mostIncomeDay = { date: transactionDate, amount: transaction.amount }
        }
      }
    })
    return {
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      mostExpensiveCategory: getHighestCategory(expenseCategoryData),
      mostIncomeCategory: getHighestCategory(incomeCategoryData),
      mostIncomeDay: {
        date: mostIncomeDay.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        amount: mostIncomeDay.amount
      },
      mostExpenseDay: {
        date: mostExpenseDay.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        amount: mostExpenseDay.amount
      }
    };
  }, [data, getHighestCategory]);

  useEffect(() => {
    if (!TransactionsData) return;
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    if (selectedRange.value === "lastMonth") {
      const lastMonthData = TransactionsData.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= lastMonth && transactionDate <= lastMonthEnd;
      });
      setData(lastMonthData)
    } else if (selectedRange.value === "last7days") {
      const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      const lastWeekData = TransactionsData.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= lastWeek;
      });
      setData(lastWeekData)
    } else if (selectedRange.value === "thisMonth") {
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const thisMonthData = TransactionsData.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= thisMonth;
      });
      setData(thisMonthData)
    } else {
      setData(TransactionsData)
    }
  }, [selectedRange, TransactionsData])
  if (!TransactionsData) return null;
  return {
    data,
    totalBalance,
    totalIncome,
    totalExpense,
    mostExpensiveCategory,
    mostIncomeCategory,
    mostIncomeDay,
    mostExpenseDay
  }
}
