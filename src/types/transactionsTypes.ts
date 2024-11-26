import z from "zod";
import { TransactionType as TransactionTypePrisma, ExpenseCategory, IncomeCategory } from "@prisma/client"

export const TransactionTypeSchema = z.nativeEnum(TransactionTypePrisma);
export type TransactionType = z.infer<typeof TransactionTypeSchema>;

export const ExpenseCategoryTypeArr = Object.values(ExpenseCategory).map((value) => ({
  value: value,
  label: value.charAt(0).toUpperCase() + value.replace(/_/g, ' ').slice(1).toLowerCase()
}))

export const IncomeCategoryTypeArr = Object.values(IncomeCategory).map((value) => ({
  value: value,
  label: value.charAt(0).toUpperCase() + value.replace(/_/g, ' ').slice(1).toLowerCase()
}))


export const IncomeCategorySchema = z.nativeEnum(IncomeCategory);
export const ExpenseCategorySchema = z.nativeEnum(ExpenseCategory);
export const transactionSchema = z.object({
  amount: z.string(),
  description: z.string().min(5, { message: "Description is required " }),
  date: z.date(),
  transactionType: TransactionTypeSchema,
  incomeCategory: IncomeCategorySchema.optional(),
  expenseCategory: ExpenseCategorySchema.optional()
});

export type transactionInput = z.infer<typeof transactionSchema>
