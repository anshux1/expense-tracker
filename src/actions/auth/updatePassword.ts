"use server"
import { UpdatePasswordInput } from "@/types"
import db from "@/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { hash } from "bcryptjs"
export async function updatePassword(data: UpdatePasswordInput) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        message: "Unauthorized! please login to continue",
      }
    }
    const hashedPassword = await hash(data.newPassword, 10)
    const userId = session.user.id
    await db.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedPassword
      }
    })
    return {
      success: true,
      message: "Password updated successfully",
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to update password",
    }
  }
} 
