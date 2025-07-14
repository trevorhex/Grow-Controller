import { ThemeOptions } from '@mui/material/styles'
import { createTheme, PaletteOptions } from '@mui/material'

const buildPalette = () => ({
  mode: 'dark'
} as PaletteOptions)

export const buildThemeOptions = () => {
  const palette = buildPalette()

  const themeOptions: ThemeOptions = {
    typography: {},
    components: {}
  }

  return ({ palette, ...themeOptions })
}

export const createCustomTheme = () => createTheme(buildThemeOptions())
