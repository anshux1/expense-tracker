"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateAccountInfoSchema, updateAccountInfoInput } from "@/types"
import { Form } from "../ui/form"
import { useDebounceCallback } from "usehooks-ts"
import { checkUniqueUsername } from "@/actions/auth/checkUniqueUsername"
import { toast } from "sonner"
import { updateAccountInfo } from "@/actions/auth/updateAccountInfo"
import { InputField } from "../common/FormFields"
export default function AccountInfo() {
  const { data, update } = useSession();
  const [, setIsCheckingUsername] = useState(false);
  const [uniqueUsernameMessage, setUniqueUsernameMessage] = useState('');
  const [, setIsSubmitting] = useState(false);
  const [usernameUnique, setUsernameUnique] = useState('')
  const debounced = useDebounceCallback(setUsernameUnique, 500);

  const form = useForm<updateAccountInfoInput>({
    resolver: zodResolver(updateAccountInfoSchema),
    defaultValues: {
      name: "",
      username: "",
    }
  })

  useEffect(() => {
    form.reset({
      name: data?.user?.name,
      username: data?.user?.username,
    })
  }, [data])

  const watchedUsername = form.watch("username");
  useEffect(() => {
    debounced(watchedUsername)
    console.log(usernameUnique)
  }, [watchedUsername, usernameUnique])

  useEffect(() => {
    const checkUsername = async () => {
      if (usernameUnique.length < 3 || usernameUnique === data?.user?.username) {
        return;
      }
      setIsCheckingUsername(true);
      setUniqueUsernameMessage("");
      try {
        const res = await checkUniqueUsername(usernameUnique);
        if (res.message) {
          setUniqueUsernameMessage(res.message)
        }
        if (!res.success) {
          toast.error(res.message)
        }
        setIsCheckingUsername(false);
      } catch (error) {
        toast.error("Oops an error accured");
        console.log(error);
      } finally {
        setIsCheckingUsername(false);
      }
    }
    checkUsername();
  }, [usernameUnique])

  const onSubmit = async (values: updateAccountInfoInput) => {
    console.log(values);
    if (uniqueUsernameMessage !== 'Username is unique') {
      toast.error("Username is not unique");
      return;
    }
    setIsSubmitting(true);
    try {
      const loadId = toast.loading("Please wait...");
      console.log("inside submit")
      const res = await updateAccountInfo(values);
      toast.dismiss(loadId);
      if (res && res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
        update({
          ...data,
          user: {
            ...data?.user,
            name: values.name,
            username: values.username,
          }
        })
      }
    } catch (error) {
      console.log("Error :", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Update your account details here.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <InputField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="space-y-2">
              <InputField
                control={form.control}
                name="username"
                label="Username"
                placeholder="Enter your username"
                required
              />
              {uniqueUsernameMessage &&
                <p className={`${uniqueUsernameMessage === "Username is unique" ? "text-green-600" : "text-red-600"}`}>
                  {uniqueUsernameMessage}
                </p>
              }
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
