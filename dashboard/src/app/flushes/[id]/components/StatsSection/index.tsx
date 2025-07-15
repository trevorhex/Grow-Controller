import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Card from '@/components/global/Card'
import { Reading } from '@/interfaces/Reading'

export interface StatsSectionProps {
  readings: Reading[]
}

export default function StatsSection({ readings }: StatsSectionProps) {
  return (
    <Card title="Statistics">
      <Box display="grid" gridTemplateColumns={{ md: '1fr 1fr 1fr' }} gap={2}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Avg Temperature
          </Typography>
          <Typography variant="body1">
            {(readings.reduce((sum, r) => sum + r.temperature, 0) / readings.length).toFixed(1)}°F
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Avg Humidity
          </Typography>
          <Typography variant="body1">
            {(readings.reduce((sum, r) => sum + r.humidity, 0) / readings.length).toFixed(1)}%
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Avg CO₂
          </Typography>
          <Typography variant="body1">
            {(readings.reduce((sum, r) => sum + r.co2, 0) / readings.length).toFixed(0)} ppm
          </Typography>
        </Box>
      </Box>
    </Card> 
  )
}
