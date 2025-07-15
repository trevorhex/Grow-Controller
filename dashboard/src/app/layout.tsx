import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import ThemeProvider from '@/components/global/ThemeProvider'
import { DrawerProvider } from '@/contexts/DrawerContext'

export const metadata: Metadata = {
  title: 'Grow Controller Dashboard'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en">
    <body>
      <AppRouterCacheProvider>
        <ThemeProvider>
          <DrawerProvider>
            {children}
          </DrawerProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </body>
  </html>
}

