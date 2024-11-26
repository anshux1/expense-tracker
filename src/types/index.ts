import z from "zod";

const nameSchema = z.string().min(1, { message: "First name is required." })
const passwordSchema = z.string().min(6, { message: "Min 6 chars." })

const usernameSchema = z.string().min(2, { message: "Min 2 chars." })
  .regex(/^[a-z0-9]+$/, { message: "Only lowercase letters and numbers." })

export const SignInSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
})
export type SignInInput = z.infer<typeof SignInSchema>

export const SignUpSchema = SignInSchema.extend({
  name: nameSchema,
})
export type SignUpInput = z.infer<typeof SignUpSchema>

export const updateAccountInfoSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  image: z.any()
})
export type updateAccountInfoInput = z.infer<typeof updateAccountInfoSchema>

export const UpdatePasswordSchema = z.object({
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
})
export type UpdatePasswordInput = z.infer<typeof UpdatePasswordSchema>
