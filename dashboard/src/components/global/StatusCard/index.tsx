'use client'

import { useState } from 'react'
import { DateTime } from 'luxon'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import Card from '@/components/global/Card'
import { Flush, Stage } from '@/interfaces/Flush'

export interface StatusCardProps {
  flush: Flush
}

export default function StatusCard({ flush }: StatusCardProps) {
  const [active, setActive] = useState(!!flush.active)

  const formatDate = (dateString?: string | Date) => dateString
    ? DateTime.fromISO(dateString.toString().replace(' ', 'T')).toLocaleString(DateTime.DATETIME_MED)
    : '--'

  return <Card title="Status" sx={{ minWidth: '33.33%' }}>
    <Stack gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Button
          variant="contained"
          color={active ? 'info' : 'primary'}
          onClick={() => setActive(!active)}
          disableRipple
          fullWidth
        >
          {active ? 'Pause' : 'Start'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setActive(false)}
          disableRipple
          fullWidth
        >
          End
        </Button>
      </Stack>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width="50%">Status</TableCell>
            <TableCell>{active ? 'Active' : 'Inactive'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Stage</TableCell>
            <TableCell>{flush.stage === Stage.Pinning ? 'Pinning' : 'Fruiting'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Started</TableCell>
            <TableCell>{formatDate(flush.start_datetime)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ended</TableCell>
            <TableCell>{formatDate(flush.end_datetime)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  </Card>
}
