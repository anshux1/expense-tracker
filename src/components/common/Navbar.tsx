'use client'
import { DarkModeSwitch } from "@/components/DarkModeSwitch";
import { Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AvatarDowpdown } from "@/components/AvatarDropdown";
export default function Navbar() {
  return (
    <div className="w-full border-b">
      <div className="max-w-screen-2xl mx-auto flex flex-col justify-center">
        <header className="px-4 lg:px-6 h-16 flex w-full items-center justify-between">
          <Link className="flex items-center justify-center" href="/">
            <Wallet className="h-6 w-6" />
            <span className="ml-2 text-lg font-bold">ExpenseTracker</span>
          </Link>
          <NavLinks />
          <div className="flex ml-4 items-center gap-3">
            <DarkModeSwitch />
            <AvatarDowpdown />
          </div>
        </header>
      </div>
    </div>
  )
}


const LandingPageLinks = [
  { key: 1, text: "Features", href: "#features" },
  { key: 3, text: "Get Started", href: "#get-started" }
]

const DashboardLinks = [
  { key: 1, text: "Dashboard", href: "/dashboard" },
  { key: 2, text: "Transactions", href: "/transactions" },
  { key: 3, text: "History", href: "/history" },
  { key: 4, text: "Settings", href: "/settings" }
]

export const NavLinks = () => {
  const { status, data } = useSession();
  const pathname = usePathname()
  if (status === 'loading') return null;
  if (pathname === '/login') return null;
  return (
    <nav className="ml-auto hidden  md:flex gap-4 sm:gap-6">
      {!data ? (LandingPageLinks.map(item => (
        <Link key={item.key} className="text-sm font-medium hover:underline underline-offset-4" href={item.href}>
          {item.text}
        </Link>
      ))) : (DashboardLinks.map(item => (
        <Link key={item.key} className="text-sm font-medium hover:underline underline-offset-4" href={item.href}>
          {item.text}
        </Link>
      )))}
    </nav>
  )
}
