import React from "react"
import "@/styles/global.css"
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
