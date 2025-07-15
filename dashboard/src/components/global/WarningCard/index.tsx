'use client'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import { Boundary } from '@/interfaces/Boundary'

export interface WarningCardProps {
  boundaries: Boundary[]
}

export default function WarningCard({ boundaries }: WarningCardProps) {
  return <Card sx={{ p: 5, minWidth: '33.33%' }}>
    <Stack gap={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Warning Boundaries</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell width="50%">Humidity Min</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Humidity Max</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>CO₂ Max</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Temperature Min</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Temperature Max</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  </Card>
}

// temperature_min_warn: number
// temperature_max_warn: number
// humidity_min: number
// humidity_min_warn: number
// humidity_max: number
// humidity_max_warn: number
// co2_max: number
// co2_max_warn: number