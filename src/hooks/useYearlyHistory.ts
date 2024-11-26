import { useRecoilValue } from "recoil";
import { yearlyHistoryAtom } from "@/store/transactions";

export const useYearlyHistory = (selectedYear: string) => {
  const yearlyHistory = useRecoilValue(yearlyHistoryAtom)
  const result = [];
  for (let i = 0; i <= 11; i++) {
    const newDate = new Date(parseInt(selectedYear), i)
    const dataFound = yearlyHistory?.find((history) => history.date === newDate.toLocaleDateString("en-US", {
      month: "short",
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
        date: newDate.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric"
        }),
        income: 0,
        expense: 0
      })
    }
  }
  return result;
}
