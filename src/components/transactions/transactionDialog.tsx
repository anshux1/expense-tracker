'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import {
  transactionInput,
  transactionSchema,
  TransactionType,
} from "@/types/transactionsTypes";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { createTransaction } from "@/actions/transactions/createTransaction"
import { usePathname } from "next/navigation"
import { toast } from "sonner"
import { ExpenseCategoryTypeArr, IncomeCategoryTypeArr } from '@/types/transactionsTypes'
import { Plus } from "lucide-react"
import { DateField, InputField, SelectField } from "../common/FormFields"
import { useFetchData } from "@/store/transactions"


interface CreateTransactionsProps {
  TriggerButtonText: string;
  transactionType: TransactionType;
}

export function TransactionDialog({ transactionType, TriggerButtonText }: CreateTransactionsProps) {
  const fetchData = useFetchData();
  const pathname = usePathname();
  const ButtonRef = useRef<HTMLButtonElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<transactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date(),
      amount: "",
      description: "",
      transactionType: transactionType,
      ...(transactionType === "INCOME"
        ? { incomeCategory: "SALARY" }
        : { expenseCategory: "FOOD" })
    }
  })
  const onSubmit = async (values: transactionInput) => {
    setIsSubmitting(true);
    try {
      const { success, message } = await createTransaction(values, pathname);
      if (!success) {
        setIsSubmitting(false);
        toast.error(message);
        return;
      }
      fetchData();
      ButtonRef.current?.click();
      toast.success(message);
    } catch (error) {
      console.log("Transaction creation error:", error)
      toast.error("An error occurred while creating the transaction.")
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> {TriggerButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new
            <span className={`${transactionType === "INCOME" ? "text-green-600" : "text-red-600"}`}
            >
              {transactionType === "INCOME" ? " income " : " expense "}
            </span>
            transactions
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <InputField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Description"
              required
            />
            <InputField
              control={form.control}
              name="amount"
              label="Amount"
              placeholder="Amount"
              type="text"
              required
            />
            <div className="grid grid-cols-2 gap-3 items-center">
              <SelectField
                control={form.control}
                name={transactionType === "INCOME" ? "incomeCategory" : "expenseCategory"}
                label="Category"
                options={transactionType === "INCOME" ? IncomeCategoryTypeArr : ExpenseCategoryTypeArr}
              />
              <DateField
                control={form.control}
                name="date"
                label="Date"
                required
              />
            </div>
            <div className="justify-end flex gap-2">
              <DialogClose asChild>
                <Button type="button" ref={ButtonRef} variant="secondary" className="w-fit">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
