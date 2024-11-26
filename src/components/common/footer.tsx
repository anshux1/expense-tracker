import Link from "next/link";
import React from "react";
export const Footer = () => {
  return (
    <footer className="flex bottom-0 w-full flex-col gap-2 sm:flex-row py-6 mx-auto shrink-0 items-center px-4 md:px-6 border-t">
      <div className="mx-auto max-w-screen-2xl w-full flex flex-col gap-4 sm:flex-row justify-between">
        <p className="text-xs text-muted-foreground">© 2024 ExpenseTracker. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">Designed by <Link href='/' className="font-medium text-black" >anshux1</Link></p>
      </div>
    </footer>
  )
}
