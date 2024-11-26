import { useRecoilValue } from "recoil";
import { monthlyHistoryAtom, MonthlyHistoryState } from "@/store/transactions";

export const useLast10DaysHistory = () => {
  const monthlyHistory = useRecoilValue(monthlyHistoryAtom)
  const last10DayDates = []
  const last10DayData: MonthlyHistoryState[] = []
  for (let i = 0; i < 10; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    last10DayDates.push(date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }))
  }
  last10DayDates.map(date => {
    const monthHistory = monthlyHistory?.find(item => item.date === date)
    if (monthHistory) {
      last10DayData.push(monthHistory)
    } else {
      last10DayData.push({
        id: "",
        income: 0,
        expense: 0,
        date: date
      })
    }
  })
  const { income, expense } = last10DayData.reduce((acc, curr) => {
    acc.income += curr.income
    acc.expense += curr.expense
    return acc
  }, { income: 0, expense: 0 })
  return {
    income,
    expense,
    data: last10DayData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }
}
