"use client"
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { RecoilRoot } from "recoil";
export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProvider>
      <NextThemesProvider {...props}>
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </NextThemesProvider>
    </SessionProvider>
  );
}
