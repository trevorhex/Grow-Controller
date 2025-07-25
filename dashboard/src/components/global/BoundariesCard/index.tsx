'use client'

import { useState } from 'react'
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

export interface BoundariesCardProps {
  boundaries: Array<keyof Boundary>
  boundary: Boundary | null
  heading?: string
}

export enum BoundaryTypeType {
  Percentage = 'percentage',
  PPM = 'ppm',
  Temperature = 'temperature',
  Time = 'time'
}

export interface BoundaryType {
  label: string
  name: keyof Boundary
  type: BoundaryTypeType
}

export type BoundariesFormType = Record<string, string>

const units: Record<BoundaryTypeType, string> = {
  [BoundaryTypeType.Percentage]: '%',
  [BoundaryTypeType.PPM]: 'ppm',
  [BoundaryTypeType.Temperature]: '°F',
  [BoundaryTypeType.Time]: ''
}

export default function BoundariesCard({ boundaries, boundary, heading }: BoundariesCardProps) {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const boundaryFields = [
    { label: 'Humidifier On', name: 'humidifier_on', type: 'percentage' },
    { label: 'Humidifier Off', name: 'humidifier_off', type: 'percentage' },
    { label: 'Humidity Min', name: 'humidity_min_warn', type: 'percentage' },
    { label: 'Humidity Max', name: 'humidity_max_warn', type: 'percentage' },
    { label: 'Fan On', name: 'fan_on', type: 'ppm' },
    { label: 'Fan Off', name: 'fan_off', type: 'ppm' },
    { label: 'CO₂ Max', name: 'co2_max_warn', type: 'ppm' },
    { label: 'Temperature Min', name: 'temperature_min_warn', type: 'temperature' },
    { label: 'Temperature Max', name: 'temperature_max_warn', type: 'temperature' },
    { label: 'Lights On', name: 'lights_on', type: 'time' },
    { label: 'Lights Off', name: 'lights_off', type: 'time' }
  ].filter(f => boundaries.includes(f.name as keyof Boundary)) as BoundaryType[]

  const defaultValues = boundaryFields.reduce((vals, b) => ({
    ...vals, [b.name]: boundary?.[b.name] ?? ''
  }), {} as Record<keyof Boundary, string>)
  
  const resolver = useResolver()
  const form = useForm<BoundariesFormType>({ defaultValues, resolver })
  const { handleSubmit, getValues, reset } = form

  const handleSave = async (values: BoundariesFormType) => {
    setLoading(true)
    console.log(values, JSON.stringify(values))
    try {
      const response = await fetch(`/api/boundaries/${boundary?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      
      if (response.ok) {
        console.log(response)
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

  const getValue = (name: keyof Boundary, type: BoundaryTypeType) => {
    const value = getValues(name)
    return value && type === BoundaryTypeType.Time
      ? DateTime.fromISO(value.replace(' ', 'T')).toLocaleString(DateTime.TIME_SIMPLE)
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
