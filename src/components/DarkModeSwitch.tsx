'use client'
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function DarkModeSwitch() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex gap-2 cursor-pointer rounded-full border p-2" onClick={toggleTheme}>
      {theme === "dark" ? (<Sun className="size-4 md:size-5" />) : (<Moon className=" size-4 md:size-5" />)}
    </div>
  )
}
