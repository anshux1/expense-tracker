'use client'
import { TransactionAtom } from "@/store/transactions";
import { useRecoilValue } from "recoil";
import { DataTable } from "./transaction-table";
import { Columns } from "./Columns";

export default function Table() {
  const transactionData = useRecoilValue(TransactionAtom);
  return <DataTable columns={Columns} data={transactionData || []} />
}
