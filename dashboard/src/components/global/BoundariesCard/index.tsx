'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DateTime } from 'luxon'

import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'

import Card from '@/components/global/Card'
import { Boundary } from '@/interfaces/Boundary'

import useResolver from './hooks/useResolver'
import FormField from './components/FormField'
import { BoundaryView, BoundaryType, BoundariesForm, BoundariesFormFields } from './interfaces'

export interface BoundariesCardProps {
  boundaries: Array<keyof BoundariesFormFields>
  boundary: Boundary | null
  heading?: string
}

const units: Record<BoundaryType, string> = {
  [BoundaryType.Percentage]: '%',
  [BoundaryType.PPM]: 'ppm',
  [BoundaryType.Temperature]: '°F',
  [BoundaryType.Time]: ''
}

export default function BoundariesCard({ boundaries, boundary, heading }: BoundariesCardProps) {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const boundaryFields = [
    { label: 'Humidifier On', name: 'humidifier_on', type: BoundaryType.Percentage },
    { label: 'Humidifier Off', name: 'humidifier_off', type: BoundaryType.Percentage },
    { label: 'Humidity Min', name: 'humidity_min_warn', type: BoundaryType.Percentage },
    { label: 'Humidity Max', name: 'humidity_max_warn', type: BoundaryType.Percentage },
    { label: 'Fan On', name: 'fan_on', type: BoundaryType.PPM },
    { label: 'Fan Off', name: 'fan_off', type: BoundaryType.PPM },
    { label: 'CO₂ Max', name: 'co2_max_warn', type: BoundaryType.PPM },
    { label: 'Temperature Min', name: 'temperature_min_warn', type: BoundaryType.Temperature },
    { label: 'Temperature Max', name: 'temperature_max_warn', type: BoundaryType.Temperature },
    { label: 'Lights On', name: 'lights_on', type: BoundaryType.Time },
    { label: 'Lights Off', name: 'lights_off', type: BoundaryType.Time }
  ].filter(f => boundaries.includes(f.name as keyof BoundariesFormFields)) as BoundaryView[]

  const defaultValues = boundaryFields.reduce((vals, b) => ({
    ...vals, [b.name]: boundary?.[b.name]?.toString() ?? ''
  }), {} as Record<keyof BoundariesFormFields, string>)

  const resolver = useResolver()
  const form = useForm<BoundariesForm>({ defaultValues, resolver })
  const { handleSubmit, getValues, reset } = form

  const formatValues = (values: BoundariesForm) => {
    Object.keys(values).forEach(key => {
      const parseValue = key.includes('co2') || key.includes('fan') ? parseInt : parseFloat
      const value = values[key as keyof BoundariesForm]?.toString() ?? '0'

      if (!key.includes('lights')) {
        values[key as keyof BoundariesForm] = parseValue(value)
      }
    })
    return JSON.stringify(values)
  }

  const handleSave = async (values: BoundariesForm) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/boundaries/${boundary?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: formatValues(values)
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

  const getValue = (name: keyof BoundariesFormFields, type: BoundaryType) => {
    const value = getValues(name)
    return value && type === BoundaryType.Time
      ? DateTime.fromISO(value.toString()).toLocaleString(DateTime.TIME_SIMPLE)
      : `${value}${units[type]}`
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
                      ? <FormField
                          form={form}
                          name={b.name}
                          type={b.type}
                          units={units[b.type]}
                          required
                        />
                      : getValue(b.name, b.type)}
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
