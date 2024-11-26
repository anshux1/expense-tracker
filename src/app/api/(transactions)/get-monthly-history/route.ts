'use server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import db from "@/db"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized access. Please log in."
      })
    }
    const userId = session.user.id
    const monthlyTransaction = await db.monthHistory.findMany({
      where: { userId: userId },
    })
    const result = monthlyTransaction.map((value) => ({
      id: value.id,
      income: value.income / 100,
      expense: value.expense / 100,
      date: new Date(value.year, value.month - 1, value.day).toLocaleString("en-Us", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      })
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    return NextResponse.json({
      success: true,
      message: "fetched succesfully",
      data: result
    })
  } catch (error) {
    console.log("Error in getMonthlyHistory", error)
    return NextResponse.json({
      success: false,
      message: error
    })
  }
}
