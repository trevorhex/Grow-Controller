import Box from '@mui/material/Box'

import { Data } from '@/interfaces/data'
import { API_URL } from '@/api/config'
import Main from '@/components/templates/Main'
import Graph from '@/components/global/Graph'

export default async function IndexPage() {
  const response = await fetch(`${API_URL}/data`)
  const data: Data[] = await response.json()

  return <Main>
    {data?.length > 0 && <Box mt={8}>
      <Graph title="Environmental Data" data={data} />
    </Box>}
  </Main>
}
