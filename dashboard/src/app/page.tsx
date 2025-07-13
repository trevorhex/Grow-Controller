import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Data } from '@/interfaces/data'
import { API_URL } from '@/api/config'
import { Graph } from './components/Graph'

export default async function App() {
  const response = await fetch(`${API_URL}/data`)
  const data: Data[] = await response.json()

  return <Box py={8}>
    <Container>
      <Typography variant="h1" textAlign="center">
        Grow Controller Dashboard
      </Typography>
      {data?.length > 0 && <Box mt={8}>
        <Graph title="Environmental Data" data={data} />
      </Box>}
    </Container>
  </Box>
}
