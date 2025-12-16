import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {ThemeProvider} from '@/src/contexts/theme-context'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Codyzard.dev - Terminal Portfolio',
  description: "Le Hoang Tu's developer portfolio presented as a command-line interface.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </ThemeProvider>
    </html>
  )
}
