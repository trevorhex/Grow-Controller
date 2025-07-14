'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import { createCustomTheme } from '@/styles/theme'

const theme = createCustomTheme()

export default function CustomThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
