import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { API_URL } from '../api/config'

export const metadata: Metadata = {
  title: 'Grow Controller Dashboard'
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const response = await fetch(`${API_URL}/data`)
  const data = await response.json()

  console.log('Data fetched:', data)

  return <html lang="en">
    <body>
      <AppRouterCacheProvider>
        {children}
      </AppRouterCacheProvider>
    </body>
  </html>
}

