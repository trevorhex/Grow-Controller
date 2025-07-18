import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { Flush } from '@/interfaces/Flush'
import { API_URL } from '@/api/config'
import Main from '@/components/templates/Main'
import Graph from '@/components/global/Graph'
import StatusCard from '@/components/global/StatusCard'
import BoundariesCard from '@/components/global/BoundariesCard'

export default async function IndexPage() {
  const response = await fetch(`${API_URL}/flushes`)
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
          boundary={flush.boundary}
          boundaries={[
            'humidity_min',
            'humidity_max',
            'co2_max',
            'lights_on',
            'lights_off'
          ]}
        />
        <BoundariesCard
          heading="Warning Boundaries"
          boundary={flush.boundary}
          boundaries={[
            'humidity_min_warn',
            'humidity_max_warn',
            'co2_max_warn',
            'temperature_min_warn',
            'temperature_max_warn'
          ]}
        />
      </Stack>
      {flush.readings.length > 0 && <Graph title="Trends" readings={flush.readings} />}
    </Stack>
  </Main>
}
