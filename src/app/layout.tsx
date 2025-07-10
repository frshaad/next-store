import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import BackgroundPattern from '@/components/background-pattern'
import ThemeProvider from '@/components/theme-provider'
import StoreProvider from '@/lib/redux/provider'

export const metadata: Metadata = {
  description: 'A basic starter for Next.js',
  title: 'Next.js Starter App',
}

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <BackgroundPattern />

        <div className="relative z-10">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <StoreProvider>{children}</StoreProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
