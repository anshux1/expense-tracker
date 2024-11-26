'use server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import db from "@/db"

export async function deleteAccount() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        message: "Unauthorized! please login to continue",
      }
    }
    const userId = session.user.id
    await db.user.delete({
      where: {
        id: userId
      }
    })
    return {
      success: true,
      message: "Account deleted successfully",
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Failed to delete account",
    }
  }
}
