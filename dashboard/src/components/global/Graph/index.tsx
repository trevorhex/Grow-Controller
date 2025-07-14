import { LineChart } from '@mui/x-charts/LineChart'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'


import { Data } from '@/interfaces/data'

export interface GraphProps {
  title?: string
  data?: Data[]
}

export default function Graph({ title, data = [] }: GraphProps) {
  return (
    <Stack spacing={3}>
      {title && <Typography variant="h4" textAlign="center">{title}</Typography>}
      <LineChart
        xAxis={[{ data: Array.from({ length: data.length }, (_, i) => i + 1) }]}
        series={[
          { 
            data: data.map(item => item.co2),
            label: 'CO2 (ppm)',
            color: '#2ecc71'
          },
          { 
            data: data.map(item => item.temperature),
            label: 'Temperature (°F)',
            color: '#e74c3c'
          },
          { 
            data: data.map(item => item.humidity),
            label: 'Humidity (%)',
            color: '#3498db'
          },
        ]}
        height={450}
      />
    </Stack>
  )
}
