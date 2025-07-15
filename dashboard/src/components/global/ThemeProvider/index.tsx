'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import createTheme from '@/styles/theme'

const theme = createTheme()

export default function CustomThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
