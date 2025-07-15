'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

import Main from '@/components/templates/Main'
import Graph from '@/components/global/Graph'
import Card from '@/components/global/Card'
import BoundariesCard, { Boundary as BoundaryType } from '@/components/global/BoundariesCard'
import { Flush } from '@/interfaces/Flush'
import { Reading } from '@/interfaces/Reading'
import { Boundary } from '@/interfaces/Boundary'

import DetailsSection from './components/DetailsSection'
import StatsSection from './components/StatsSection'

interface FlushData {
  flush: Flush
  readings: Reading[]
  boundary: Boundary | null
}

export default function FlushPage() {
  const params = useParams()
  const flushId = params.id as string
  const [data, setData] = useState<FlushData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFlushData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/flushes/${flushId}`)
        
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)
        
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    flushId && fetchFlushData()
  }, [flushId])

  if (loading) {
    return (
      <Main>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Main>
    )
  }

  if (error || !data) {
    return (
      <Main>
        <Alert severity={error ? "error" : "warning"} sx={{ mb: 2 }}>
          {error ?? 'No flush data found'}
        </Alert>
      </Main>
    )
  }

  const { flush, readings, boundary } = data

  return (
    <Main>
      <Stack spacing={4}>
        <DetailsSection flush={flush} readings={readings} />

        {boundary && (
          <BoundariesCard 
            heading="Environmental Boundaries"
            boundaries={[
              { label: 'Temperature Min Warning', name: 'temperature_min_warn', value: boundary?.temperature_min_warn ?? '', type: 'temperature' },
              { label: 'Temperature Max Warning', name: 'temperature_max_warn', value: boundary?.temperature_max_warn ?? '', type: 'temperature' },
              { label: 'Humidity Min', name: 'humidity_min', value: boundary?.humidity_min ?? '', type: 'percentage' },
              { label: 'Humidity Min Warning', name: 'humidity_min_warn', value: boundary?.humidity_min_warn ?? '', type: 'percentage' },
              { label: 'Humidity Max', name: 'humidity_max', value: boundary?.humidity_max ?? '', type: 'percentage' },
              { label: 'Humidity Max Warning', name: 'humidity_max_warn', value: boundary?.humidity_max_warn ?? '', type: 'percentage' },
              { label: 'CO₂ Max', name: 'co2_max', value: boundary?.co2_max ?? '', type: 'ppm' },
              { label: 'CO₂ Max Warning', name: 'co2_max_warn', value: boundary?.co2_max_warn ?? '', type: 'ppm' }
            ]}
          />
        )}

        {readings.length > 0 && <>
          <StatsSection readings={readings} />
          <Graph title="Trends" readings={readings} />
        </>}
      </Stack>
    </Main>
  )
}
