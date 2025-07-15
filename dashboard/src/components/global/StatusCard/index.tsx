'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import { Flush } from '@/interfaces/Flush'

export interface StatusCardProps {
  flush: Flush
}

export default function StatusCard({ flush }: StatusCardProps) {
  const [active, setActive] = useState(!!flush.active)

  return <Card sx={{ p: 5, minWidth: '33.33%' }}>
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
            <TableCell width="60px">Status</TableCell>
            <TableCell>{active ? 'Active' : 'Inactive'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell width="60px">Started</TableCell>
            <TableCell>{flush.start_datetime?.toLocaleString() ?? '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ended</TableCell>
            <TableCell>{flush.end_datetime?.toLocaleString() ?? '--'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  </Card>
}
