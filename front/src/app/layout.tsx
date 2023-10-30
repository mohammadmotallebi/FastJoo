import React from "react"
import type {Metadata} from 'next'
import {Roboto} from 'next/font/google'
import {Providers} from "@redux/provider";
import '@/app/globals.css'
import theme from "@utils/theme";
import {ThemeProvider} from "@mui/material";

const roboto = Roboto({weight:'400',style:"normal", subsets: ['latin-ext'] })

export const metadata: Metadata = {
  title: 'Create Next Appfghfghfghfghf',
  description: 'Generated by create next appvxdgdfgdfhdhfdfgh',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <ThemeProvider theme={theme}>
        <html lang="en">

        <body className={roboto.className}>
        <Providers>{children}</Providers>
        </body>

        </html>
      </ThemeProvider>

  )
}