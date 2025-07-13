import { LineChart } from '@mui/x-charts/LineChart'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'


import { Data } from '@/interfaces/data'

export interface GraphProps {
  title?: string
  data?: Data[]
}

export const Graph = ({ title, data = [] }: GraphProps) => (
  <Stack spacing={3}>
    {title && <Typography variant="h4" textAlign="center">{title}</Typography>}
    <LineChart
      xAxis={[{ data: Array.from({ length: data.length }, (_, i) => i + 1) }]}
      series={[
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
        { 
          data: data.map(item => item.co2),
          label: 'CO2 (ppm)',
          color: '#2ecc71'
        },
      ]}
      height={400}
    />
  </Stack>
)
