import axios from "axios";
import { atom, selector, useRecoilCallback } from "recoil";

export interface TransactionState {
  id: string;
  amount: number;
  date: Date;
  description: string;
  type: string;
  category: string;
  createdAt: Date;
}

export interface MonthlyHistoryState {
  id: string;
  income: number;
  expense: number;
  date: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const transactionsSelector = selector<TransactionState[] | undefined>({
  key: "transactionsSelector",
  get: async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/get-transactions`);
      if (data.success) {
        return data.data;
      }
      console.error("API request was not successful:", data);
      return undefined;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return undefined;
    }
  }
})

export const TransactionAtom = atom<TransactionState[] | undefined>({
  key: "transactionAtom",
  default: transactionsSelector
})

export const monthlyHistorySelector = selector<MonthlyHistoryState[] | undefined>({
  key: "monthlyHistorySelector",
  get: async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/get-monthly-history`);
      if (data.success) {
        return data.data;
      }
      console.error("API request was not successful:", data);
      return undefined;
    } catch (error) {
      console.error("Error fetching monthly history:", error);
      return undefined;
    }
  }
})

export const monthlyHistoryAtom = atom<MonthlyHistoryState[] | undefined>({
  key: "monthlyHistoryAtom",
  default: monthlyHistorySelector
})

export const yearlyHistorySelector = selector<MonthlyHistoryState[] | undefined>({
  key: "yearlyHistorySelector",
  get: async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/get-yearly-history`);
      if (data.success) {
        return data.data;
      }
      console.error("API request was not successful:", data);
      return undefined;
    } catch (error) {
      console.error("Error fetching yearly history:", error);
      return undefined;
    }
  }
})

export const yearlyHistoryAtom = atom<MonthlyHistoryState[] | undefined>({
  key: "yearlyHistoryAtom",
  default: yearlyHistorySelector
})

export const useFetchData = () => {
  return useRecoilCallback(({ refresh }) => async () => {
    refresh(transactionsSelector)
    refresh(monthlyHistorySelector)
    refresh(yearlyHistorySelector)
  })
}
