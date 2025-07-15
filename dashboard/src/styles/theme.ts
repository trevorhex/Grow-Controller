import { ThemeOptions } from '@mui/material/styles'
import { createTheme, PaletteOptions } from '@mui/material'

const buildPalette = () => ({
  mode: 'dark',
  primary: { main: '#2ecc71' },
  secondary: { main: '#e74c3c' },
  info: { main: '#3498db' }
} as PaletteOptions)

export const buildThemeOptions = () => {
  const palette = buildPalette()

  const themeOptions: ThemeOptions = {
    typography: {},
    components: {}
  }

  return ({ palette, ...themeOptions })
}

export default () => createTheme(buildThemeOptions())
