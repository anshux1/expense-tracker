'use client'
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import AccountInfo from "@/components/settings/accountInfo"
import SecurityCard from "@/components/settings/updatePassword"
import DeleteAccount from "@/components/settings/deleteAccount"
import { signOut } from "next-auth/react"

export default function SettingsPage() {

  return (
    <div className="max-w-screen-2xl p-4 overflow-x-hidden mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <AccountInfo />
        <SecurityCard />
      </div>
      <DeleteAccount />
      <div className="mt-6">
        <Button variant="outline" className="w-full" onClick={async () => await signOut({
          callbackUrl: "/",
          redirect: true
        })}>
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  )
}
