import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Main from '@/components/templates/Main'

export default function BoundariesPage() {
  return (
    <Main>
      <Box mt={8}>
        <Typography variant="h4" textAlign="center">Boundaries</Typography>
        <Typography variant="body1" textAlign="center">
          No boundaries at the moment. Please check back later.
        </Typography>
      </Box>
    </Main>
  )
}
