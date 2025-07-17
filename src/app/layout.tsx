import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import BackgroundPattern from '@/components/background-pattern'
import ThemeProvider from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import StoreProvider from '@/lib/redux/provider'

export const metadata: Metadata = {
  description:
    "The front page of tech. Discover, discuss, and share what's new and interesting in the world of technology.",
  title: 'NodeLink',
}

const inter = Inter({
  variable: '--font-inter',
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
            <StoreProvider>
              {children}
              <Toaster position="bottom-center" richColors />
            </StoreProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
