import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Main from '@/components/templates/Main'

export default function WarningsPage() {
  return (
    <Main>
      <Box mt={8}>
        <Typography variant="h4" textAlign="center">Warnings</Typography>
        <Typography variant="body1" textAlign="center">
          No warnings at the moment. Please check back later.
        </Typography>
      </Box>
    </Main>
  )
}
