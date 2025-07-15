'use client'

import { useState, KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'

import { maskNumberInput } from '@/libs/forms'

import useResolver from './hooks/useResolver'

export interface BoundariesCardProps {
  boundaries: Boundary[]
  heading?: string
}

export interface Boundary {
  name: string
  value: string | number
  type: 'percentage' | 'ppm' | 'temperature' | 'time'
}

const units: Record<Boundary['type'], string> = {
  percentage: '%',
  ppm: 'ppm',
  temperature: '°F',
  time: ''
}

export default function BoundariesCard({ boundaries, heading }: BoundariesCardProps) {
  const [editing, setEditing] = useState(false)

  const defaultValues = boundaries.reduce((vals, boundary) => ({
    ...vals,
    [boundary.name]: boundary.value.toString()
  }), {} as Record<string, string>)
  
  const resolver = useResolver(boundaries)
  const { register, handleSubmit, getValues } = useForm<Record<string, string>>({ defaultValues, resolver })

  const handleSave = async (values: Record<string, string>) => {
    setEditing(false)
  }

  return <Card sx={{ p: 5, minWidth: '33.33%' }}>
    <form onSubmit={handleSubmit(handleSave)}>
      <Stack gap={2} alignItems="flex-end">
          <Table>
            {heading && <TableHead>
              <TableRow>
                <TableCell colSpan={2} sx={{ ...editing ? { borderBottom: 'none' } : {} }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                    {heading}
                    {editing
                      ? <IconButton onClick={() => setEditing(false)}><CloseIcon /></IconButton>
                      : <IconButton onClick={() => setEditing(true)}><EditIcon /></IconButton>}
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>}
            <TableBody>
              {boundaries.map((boundary, i) =>
                <TableRow key={i}>
                  <TableCell sx={{ width: '50%', ...editing ? { py: 0.81, borderBottom: 'none' } : {} }}>
                    {boundary.name}
                  </TableCell>
                  <TableCell sx={{ pl: 1.5, ...editing ? { py: 0.81, pl: 0, borderBottom: 'none' } : {} }}>
                    {editing
                      ? <TextField
                          {...register(boundary.name, { required: true })}
                          onKeyDown={e => maskNumberInput(e, getValues(boundary.name))}
                          size="small"
                          slotProps={{
                            input: {
                              endAdornment: units[boundary.type] &&
                                <InputAdornment position="end">{units[boundary.type]}</InputAdornment>
                            }
                          }}
                        />
                      : `${boundary.value}${units[boundary.type]}`}
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
          {editing &&
            <Button variant="contained" type="submit" loading={false} disableRipple>Save</Button>}
      </Stack>
    </form>
  </Card>
}
