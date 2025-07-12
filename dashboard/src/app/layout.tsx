import { ReactNode } from 'react'
import type { Metadata } from 'next'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const metadata: Metadata = {
  title: 'Grow Controller'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en">
    <body>
      {children}
    </body>
  </html>
}

