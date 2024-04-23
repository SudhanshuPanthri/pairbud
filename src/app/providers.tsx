"use client"

import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return(
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </SessionProvider>
    
  )
}
