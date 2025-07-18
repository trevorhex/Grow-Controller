'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'

import Card from '@/components/global/Card'
import { maskNumberInput } from '@/libs/forms'
import { Boundary } from '@/interfaces/Boundary'

import useResolver from './hooks/useResolver'

export interface BoundariesCardProps {
  boundaries: Array<keyof Boundary>
  boundary: Boundary | null
  heading?: string
}

export interface BoundaryType {
  label: string
  name: keyof Boundary
  type: 'percentage' | 'ppm' | 'temperature' | 'time'
}

const units: Record<BoundaryType['type'], string> = {
  percentage: '%',
  ppm: 'ppm',
  temperature: '°F',
  time: ''
}

export default function BoundariesCard({ boundaries, boundary, heading }: BoundariesCardProps) {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const boundaryFields = [
    { label: 'Humidity Min', name: 'humidity_min', type: 'percentage' },
    { label: 'Humidity Max', name: 'humidity_max', type: 'percentage' },
    { label: 'Humidity Min', name: 'humidity_min_warn', type: 'percentage' },
    { label: 'Humidity Max', name: 'humidity_max_warn', type: 'percentage' },
    { label: 'CO₂ Max', name: 'co2_max', type: 'ppm' },
    { label: 'CO₂ Max', name: 'co2_max_warn', type: 'ppm' },
    { label: 'Temperature Min', name: 'temperature_min_warn', type: 'temperature' },
    { label: 'Temperature Max', name: 'temperature_max_warn', type: 'temperature' },
    { label: 'Lights On', name: 'lights_on', type: 'time' },
    { label: 'Lights Off', name: 'lights_off', type: 'time' }
  ].filter(f => boundaries.includes(f.name as keyof Boundary)) as BoundaryType[]

  const defaultValues = boundaryFields.reduce((vals, b) => ({
    ...vals, [b.name]: boundary?.[b.name] ?? ''
  }), {} as Record<keyof Boundary, string>)
  
  const resolver = useResolver(boundaries)
  const { register, handleSubmit, getValues, reset } = useForm<Record<string, string>>({ defaultValues, resolver })

  const handleSave = async (values: Record<keyof Boundary, string>) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/boundaries/${boundary?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      
      if (response.ok) {
        reset(values)
        setEditing(false)
      } else {
        console.error('Failed to update boundary:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating boundary:', error)
    } finally {
      setLoading(false)
    }
  }

  return <Card sx={{ minWidth: '33.33%' }}>
    <form onSubmit={handleSubmit(handleSave)}>
      <Stack gap={2} alignItems="flex-end">
          <Table>
            {heading && <TableHead>
              <TableRow>
                <TableCell colSpan={2} sx={{ ...editing ? { borderBottom: 'none' } : {} }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                    <Typography variant="h5">{heading}</Typography>
                    {editing
                      ? <IconButton onClick={() => setEditing(false)}><CloseIcon /></IconButton>
                      : <IconButton onClick={() => setEditing(true)}><EditIcon /></IconButton>}
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>}
            <TableBody>
              {boundaryFields.map((b, i) =>
                <TableRow key={i}>
                  <TableCell sx={{ width: '50%', ...editing ? { py: 0.81, borderBottom: 'none' } : {} }}>
                    {b.label}
                  </TableCell>
                  <TableCell sx={{ pl: 1.5, ...editing ? { py: 0.81, pl: 0, borderBottom: 'none' } : {} }}>
                    {editing
                      ? <TextField
                          {...register(b.name, { required: true })}
                          onKeyDown={e => maskNumberInput(e, getValues(b.name))}
                          size="small"
                          slotProps={{
                            input: {
                              endAdornment: units[b.type] &&
                                <InputAdornment position="end">{units[b.type]}</InputAdornment>
                            }
                          }}
                        />
                      : `${getValues(b.name) ?? ''}${units[b.type]}`}
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
          {editing &&
            <Button variant="contained" type="submit" loading={loading} disableRipple>Save</Button>}
      </Stack>
    </form>
  </Card>
}
