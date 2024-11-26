import db from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Fetching transactions")
  try {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session?.user) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized access. Please log in."
      })
    }
    const userId = session.user.id
    const transactions = await db.transaction.findMany({
      where: { userId: userId }
    })
    const result = transactions.map(value => {
      const category = value.incomeCategory || value.expenseCategory || "";
      return {
        id: value.id,
        amount: value.amount / 100,
        date: value.date,
        description: value.description,
        type: value.type,
        category: category?.charAt(0).toUpperCase() + category?.slice(1).replaceAll("_", " ").toLowerCase(),
        createdAt: value.createdAt
      }
    }
    )
    console.log("Result : ", result)

    return NextResponse.json({
      success: true,
      message: "transactions fetched succesfully",
      data: result
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error while fetching transactions!",
      error: error
    }, { status: 500 })
  }
}
