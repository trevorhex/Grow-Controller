// 'use client'

import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const metadata: Metadata = {
  title: 'Grow Controller'
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const data = await fetch('http://127.0.0.1:5000/data', {
    cache: 'no-store'
  })

  console.log('Data fetched:', data)

  return <html lang="en">
    <body>
      <AppRouterCacheProvider>
        {children}
      </AppRouterCacheProvider>
    </body>
  </html>
}

