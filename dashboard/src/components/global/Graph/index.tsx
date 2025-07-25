import { DateTime } from 'luxon'

import { LineChart } from '@mui/x-charts/LineChart'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import createTheme from '@/styles/theme'
import { Reading } from '@/interfaces/Reading'

export interface GraphProps {
  title?: string
  readings?: Reading[]
}

const theme = createTheme()

export default function Graph({ title, readings = [] }: GraphProps) {
  return (
    <Stack spacing={3}>
      {title && <Typography variant="h2" textAlign="center">{title}</Typography>}
      <LineChart
        xAxis={[{ 
          data: readings.map(reading =>
            DateTime.fromISO(reading.timestamp.replace(' ', 'T')).toLocaleString(DateTime.DATETIME_MED)),
          scaleType: 'point'
        }]}
        series={[{ 
          data: readings.map(reading => reading.co2),
          label: 'CO₂ (ppm)',
          color: theme.palette.primary.main
        }, { 
          data: readings.map(reading => reading.temperature),
          label: 'Temperature (°F)',
          color: theme.palette.secondary.main
        }, {
          data: readings.map(reading => reading.humidity),
          label: 'Humidity (%)',
          color: theme.palette.info.main
        }]}
        height={450}
      />
    </Stack>
  )
}
