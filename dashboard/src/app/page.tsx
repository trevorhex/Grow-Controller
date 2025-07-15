import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { Flush } from '@/interfaces/Flush'
import { API_URL } from '@/api/config'
import Main from '@/components/templates/Main'
import Graph from '@/components/global/Graph'
import StatusCard from '@/components/global/StatusCard'
import BoundariesCard from '@/components/global/BoundariesCard'

export default async function IndexPage() {
  const response = await fetch(`${API_URL}/flushes/current`)
  const flush: Flush = await response.json()

  if (!flush) {
    return <Main>
      <Typography variant="h4" textAlign="center">No current flush.</Typography>
    </Main>
  }

  return <Main>
    <Stack gap={6}>
      <Stack direction={{ md: 'row' }} gap={4}>
        <StatusCard flush={flush} />
        <BoundariesCard
          heading="Relay Boundaries"
          boundaries={flush.boundary
            ? [
                { label: 'Humidity Min', name: 'humidity_min', value: flush.boundary.humidity_min, type: 'percentage' },
                { label: 'Humidity Max', name: 'humidity_max', value: flush.boundary.humidity_max, type: 'percentage' },
                { label: 'CO₂ Max', name: 'co2_max', value: flush.boundary.co2_max, type: 'ppm' },
                { label: 'Lights On', name: 'lights_on', value: '07:00', type: 'time' },
                { label: 'Lights Off', name: 'lights_off', value: '19:00', type: 'time' }
              ]
            : []}
        />
        <BoundariesCard
          heading="Warning Boundaries"
          boundaries={flush.boundary
            ? [
                { label: 'Humidity Min', name: 'humidity_min_warn', value: flush.boundary.humidity_min_warn, type: 'percentage' },
                { label: 'Humidity Max', name: 'humidity_max_warn', value: flush.boundary.humidity_max_warn, type: 'percentage' },
                { label: 'CO₂ Max', name: 'co2_max_warn', value: flush.boundary.co2_max_warn, type: 'ppm' },
                { label: 'Temperature Min', name: 'temperature_min_warn', value: flush.boundary.temperature_min_warn, type: 'temperature' },
                { label: 'Temperature Max', name: 'temperature_max_warn', value: flush.boundary.temperature_max_warn, type: 'temperature' }
              ]
            : []}
        />
      </Stack>
      {flush.readings.length > 0 && <Graph title="Trends" readings={flush.readings} />}
    </Stack>
  </Main>
}
