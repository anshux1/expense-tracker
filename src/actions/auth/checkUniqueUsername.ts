'use server'
import db from "@/db";
export const checkUniqueUsername = async (username: string) => {
  try {
    const isUsernameUnique = await db.user.findFirst({
      where: { username }
    })
    if (isUsernameUnique) {
      return {
        success: false,
        message: "Username already taken"
      }
    }
    return {
      success: true,
      message: "Username is unique"
    }
  } catch (error) {
    const errorObject = error as Error
    console.log("Error while checking unique username :", errorObject.message)
    return {
      success: false,
      message: "Oops. error while checking unique username"
    }
  }
}