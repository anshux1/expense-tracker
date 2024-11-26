'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";

const menuItems = [
  { key: 1, text: "Dashboard", href: "/dashboard" },
  { key: 2, text: "Transactions", href: "/transactions" },
  { key: 3, text: "History", href: "/history" },
  { key: 4, text: "Settings", href: "/settings" },
]

export function AvatarDowpdown() {
  const router = useRouter();
  const { data } = useSession();
  if (!data?.user) return null;

  const { image, name, username } = data.user
  return (
    <div className="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-10 border cursor-pointer p-[1px] border-dashed border-orange-500">
            <AvatarImage src={image ?? ""} alt="Profile" className="rounded-full dark:backdrop-invert" />
            <AvatarFallback className="p-[1px]">{name?.at(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div>
            <DropdownMenuLabel className="pb-0">{name}</DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs text-gray-600 font-medium mt-0">{username}</DropdownMenuLabel>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.key} onClick={() => router.push(item.href)}>
                {item.text}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
            signOut()
            router.replace('/')
          }}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

  )
}
