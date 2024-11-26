"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
  type: string;
  category: string;
  createdAt: Date;
}

export const Columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: () => <div className="ml-5">Description</div>,
    cell: ({ row }) => <div className="ml-5">{row.getValue("description")}</div>
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 size-2" />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formattedAmount = new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "INR"
      }).format(amount)
      return <div className="font-medium">{formattedAmount}</div>
    },
    enableHiding: false
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 size-2" />
      </div>
    ),
    cell: ({ row }) => {
      const data = row.original;
      return <div className={`${data.type === "INCOME" ? "text-green-500 dark:text-green-400" : "text-red-700 dark:text-red-400"} font-medium`}>
        {data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase()}
      </div>
    }
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer text-nowrap"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Transaction Date
        <ArrowUpDown className="ml-2 size-2" />
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("date");
      const formatedDate = new Date(date as string).toLocaleString("en-Us", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      })
      return <div className="font-medium">{formatedDate}</div>
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer text-nowrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created at
          <ArrowUpDown className="ml-2 size-2" />
        </div>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      const formatedDate = new Date(date as string).toLocaleString("en-Us", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      })
      return <div className="font-medium">{formatedDate}</div>
    }
  },
]
