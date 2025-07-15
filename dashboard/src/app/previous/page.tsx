import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Main from '@/components/templates/Main'

export default function PreviousFlushesPage() {
  return (
    <Main>
      <Box mt={8}>
        <Typography variant="h4" textAlign="center">Previous Flushes</Typography>
        <Typography variant="body1" textAlign="center">
          No previous flushes at the moment. Please check back later.
        </Typography>
      </Box>
    </Main>
  )
}
