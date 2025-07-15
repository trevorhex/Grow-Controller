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
    typography: {
      h1: { fontSize: '4rem' },
      h2: { fontSize: '3rem' },
      h3: { fontSize: '2.5rem' },
      h4: { fontSize: '2rem' }
    },
    components: {}
  }

  return ({ palette, ...themeOptions })
}

export default () => createTheme(buildThemeOptions())
