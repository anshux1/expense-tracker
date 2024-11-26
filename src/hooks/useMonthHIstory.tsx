import { useRecoilValue } from "recoil";
import { monthlyHistoryAtom } from "@/store/transactions";

export const useMonthHistory = (selectedMonthYear: string, selectedMonth: string) => {
  const monthlyHistory = useRecoilValue(monthlyHistoryAtom)
  const thisMonthDate = new Date(parseInt(selectedMonthYear), parseInt(selectedMonth), 1)
  const thisMonthLastDate = new Date(parseInt(selectedMonthYear), parseInt(selectedMonth) + 1, 0)
  console.log("monthlyHistory", monthlyHistory)
  const result = [];
  for (let index = thisMonthDate; index <= thisMonthLastDate; index.setDate(index.getDate() + 1)) {
    const dataFound = monthlyHistory?.find((history): boolean => history.date === index.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }))
    if (dataFound) {
      result.push({
        date: dataFound.date,
        income: dataFound.income,
        expense: dataFound.expense
      })
    } else {
      result.push({
        date: index.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric"
        }),
        income: 0,
        expense: 0
      })
    }
  }
  return result;
}
