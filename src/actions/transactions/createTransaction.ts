'use server';
import db, { TransactionClient } from "@/db"
import { authOptions } from "@/lib/auth";
import { transactionInput } from "@/types/transactionsTypes";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createTransaction = async (data: transactionInput, currentPath: string) => {
  try {
    const session = await getServerSession(authOptions);
    console.log("session", session)
    if (!session?.user) {
      return {
        success: false,
        message: "Unauthorized access. Please log in."
      }
    }
    const userId = session.user.id
    await db.$transaction(async (tx: TransactionClient) => {
      await insertTransaction(data, userId, tx)
      await updateOrCreateHistory(data, userId, tx)
    })
    revalidatePath(currentPath);
    return {
      success: true,
      message: "Transaction created successfully!",
    }
  } catch (error) {
    console.error("Error creating transaction:", error);
    return {
      success: false,
      message: "Error creating transaction. Please try again."
    }
  }
}

async function updateOrCreateHistory(data: transactionInput, userId: string, tx: TransactionClient) {
  const { day, month, year } = ((date: Date) => {
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }
  })(data.date);

  const incrementAmount = data.transactionType === "INCOME"
    ? { income: { increment: parseFloat(data.amount) * 100 } }
    : { expense: { increment: parseFloat(data.amount) * 100 } };

  const insertAmount = {
    income: data.transactionType === "INCOME" ? parseFloat(data.amount) * 100 : 0,
    expense: data.transactionType === "EXPENSE" ? parseFloat(data.amount) * 100 : 0,
  };
  await Promise.all([
    tx.monthHistory.upsert({
      where: {
        userId: userId,
        day,
        month,
        year,
      },
      create: {
        userId: userId,
        day,
        month,
        year,
        ...insertAmount
      },
      update: {
        ...incrementAmount
      }
    }),
    tx.yearHistory.upsert({
      where: {
        userId: userId,
        month,
        year,
      },
      create: {
        userId: userId,
        month,
        year,
        ...insertAmount
      },
      update: {
        ...incrementAmount
      }
    })
  ])
}


async function insertTransaction(data: transactionInput, userId: string, tx: TransactionClient) {
  await tx.transaction.create({
    data: {
      userId: userId,
      type: data.transactionType,
      expenseCategory: data.transactionType === "EXPENSE" ? data.expenseCategory : undefined,
      incomeCategory: data.transactionType === "INCOME" ? data.incomeCategory : undefined,
      amount: parseFloat(data.amount) * 100,
      description: data.description,
      date: data.date,
    }
  })
}
