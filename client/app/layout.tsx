import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/molecules/navbar"

export const metadata: Metadata = {
  title: "Rexo",
  description: "Rexo AI Assistant",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
