'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UpdatePasswordInput, UpdatePasswordSchema } from "@/types"
import { InputField } from "../common/FormFields"
import { Form } from "../ui/form"
import { toast } from "sonner"
import { updatePassword } from "@/actions/auth/updatePassword"

export default function SecurityCard() {
  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    }
  })
  const onSubmit = async (data: UpdatePasswordInput) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const res = await updatePassword(data)
      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update password")
    } finally {
      form.reset()
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your password and security preferences.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <InputField
                control={form.control}
                name="newPassword"
                label="New Password"
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="space-y-2">
              <InputField
                control={form.control}
                name="confirmPassword"
                label="Confirm New Password"
                placeholder="Confirm your new password"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Update Password</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
