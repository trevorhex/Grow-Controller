import { DateTime } from 'luxon'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

import Card from '@/components/global/Card'
import { Flush } from '@/interfaces/Flush'
import { Reading } from '@/interfaces/Reading'

export interface DetailsSectionProps {
  flush: Flush
  readings: Reading[]
}

export default function DetailsSection({ flush, readings }: DetailsSectionProps) {
  const getStatusColor = (active: number, current: number) => {
    if (current) return 'primary'
    if (active) return 'success'
    return 'default'
  }

  const getStatusText = (active: number, current: number) => {
    if (current) return 'Current'
    if (active) return 'Active'
    return 'Completed'
  }

  const formatDate = (dateString: string | Date) =>
    DateTime.fromISO(dateString.toString()).toLocaleString(DateTime.DATETIME_MED)

  return (
    <Card>
      <Stack direction={{ md: 'row' }} alignItems="center" gap={2} mb={5}>
        <Typography variant="h5">Flush Details</Typography>
        <Chip
          label={getStatusText(flush.active, flush.current)}
          color={getStatusColor(flush.active, flush.current)}
          size="small"
        />
      </Stack>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Start Date
          </Typography>
          <Typography variant="body1">
            {formatDate(flush.start_datetime)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            End Date
          </Typography>
          <Typography variant="body1">
            {flush.end_datetime ? formatDate(flush.end_datetime) : 'In Progress'}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Readings
          </Typography>
          <Typography variant="body1">
            {readings.length}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Status
          </Typography>
          <Typography variant="body1">
            {getStatusText(flush.active, flush.current)}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}