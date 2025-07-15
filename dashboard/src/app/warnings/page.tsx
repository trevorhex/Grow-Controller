import Typography from '@mui/material/Typography'

import Main from '@/components/templates/Main'

export default function WarningsPage() {
  return (
    <Main>
      <Typography variant="h4" textAlign="center">Warnings</Typography>
      <Typography variant="body1" textAlign="center">
        No warnings at the moment. Please check back later.
      </Typography>
    </Main>
  )
}
