'use client'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import { Boundary } from '@/interfaces/Boundary'

export interface BoundariesCardProps {
  boundary: Boundary | null
}

export default function BoundariesCard({ boundary }: BoundariesCardProps) {
  return <Card sx={{ p: 5, minWidth: '33.33%' }}>
    <Stack gap={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Relay Boundaries</TableCell>
          </TableRow>
        </TableHead>
        {boundary
          ? <TableBody>
              <TableRow>
                <TableCell width="50%">Humidity Min</TableCell>
                <TableCell>{boundary.humidity_min}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Humidity Max</TableCell>
                <TableCell>{boundary.humidity_max}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>CO₂ Max</TableCell>
                <TableCell>{boundary.co2_max}ppm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lights On</TableCell>
                <TableCell>07:00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lights Off</TableCell>
                <TableCell>19:00</TableCell>
              </TableRow>
            </TableBody>
          : <TableBody>
              <TableRow>
                <TableCell colSpan={2}>No boundaries set</TableCell>
              </TableRow>
            </TableBody>}
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