import Box from '@mui/material/Box'

import { Readings } from '@/interfaces/readings'
import { API_URL } from '@/api/config'
import Main from '@/components/templates/Main'
import Graph from '@/components/global/Graph'

export default async function IndexPage() {
  const response = await fetch(`${API_URL}/flush`)
  const readings: Readings[] = await response.json()

  return <Main>
    {readings?.length > 0 && <Box mt={8}>
      <Graph title="Environmental Data" readings={readings} />
    </Box>}
  </Main>
}
