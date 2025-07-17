'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

import Main from '@/components/templates/Main'
import Graph from '@/components/global/Graph'
import BoundariesCard from '@/components/global/BoundariesCard'
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
            boundary={boundary}
            boundaries={[
              'temperature_min_warn',
              'temperature_max_warn',
              'humidity_min',
              'humidity_min_warn',
              'humidity_max',
              'humidity_max_warn',
              'co2_max',
              'co2_max_warn',
              'lights_on',
              'lights_off'
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
