import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { Flush } from '@/interfaces/Flush'
import { API_URL } from '@/api/config'
import Main from '@/components/templates/Main'
import Graph from '@/components/global/Graph'
import StatusCard from '@/components/global/StatusCard'
import BoundariesCard from '@/components/global/BoundariesCard'
import WarningCard from '@/components/global/WarningCard'

export default async function IndexPage() {
  const response = await fetch(`${API_URL}/flush`)
  const flush: Flush = await response.json()

  if (!flush) {
    return <Main>
      <Typography variant="h4" textAlign="center">No current flush.</Typography>
    </Main>
  }

  return <Main>
    <Stack gap={6}>
      <Typography variant="h1">Current Flush</Typography>
      <Stack direction="row" gap={4} mt={4}>
        <StatusCard flush={flush} />
        <BoundariesCard boundaries={flush.boundaries} />
        <WarningCard boundaries={flush.boundaries} />
      </Stack>
      {flush.readings.length > 0 && <Graph title="Trends" readings={flush.readings} />}
    </Stack>
  </Main>
}
