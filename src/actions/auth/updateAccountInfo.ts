'use server'
import db from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
interface updateAccountInfoInput {
  name: string;
  username: string;
}

export const updateAccountInfo = async (data: updateAccountInfoInput) => {
  const session = await getServerSession(authOptions);
  if (!session) return {
    success: false,
    message: "Unauthorized! Please login to continue.",
  }
  const userId = session.user?.id;
  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        username: data.username,
      },
    });
    return {
      success: true,
      message: "Account info updated successfully",
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Failed to update account info",
    }
  }
};
