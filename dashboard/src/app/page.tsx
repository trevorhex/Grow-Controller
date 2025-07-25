'use client'

import { useState, useEffect } from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import { FlushData } from '@/interfaces/Flush'

import Main from '@/components/templates/Main'
import Graph from '@/components/global/Graph'
import StatusCard from '@/components/global/StatusCard'
import BoundariesCard from '@/components/global/BoundariesCard'
import AsyncButton from '@/components/global/AsyncButton'

export default function IndexPage() {
  const [flush, setFlush] = useState<FlushData | null>(null)
  const [loadingPage, setLoadingPage] = useState(true)

  const fetchFlushData = async () => {
    setLoadingPage(true)
    try {
      const response = await fetch('/api/flushes/current', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        const result = await response.json()
        setFlush(result)
      }
    } catch (err) {
      console.log('Error fetching flush data:', err)
    } finally {
      setLoadingPage(false)
    }
  }

  const handleCreateFlush = async (setLoading: (loading: boolean) => void) => {
    setLoading(true)
    try {
      const response = await fetch('/api/flushes/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
        const newFlushData: FlushData = await response.json()
        console.log('New flush created:', newFlushData)
        setFlush(newFlushData)
      } else {
        console.error('Failed to create flush:', response.statusText)
      }
    } catch (error) {
      console.error('Error creating flush:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFlushData()
  }, [])

  if (loadingPage) {
    return (
      <Main>
        <Stack justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Stack>
      </Main>
    )
  }

  if (!flush || flush.error) {
    return (
      <Main>
        <Stack gap={6} alignItems="center">
          <Typography variant="h4" textAlign="center">No current flush.</Typography>
          <AsyncButton variant="contained" onClick={handleCreateFlush}>Create New Flush</AsyncButton>
        </Stack>
      </Main>
    )
  }

  return <Main>
    <Stack gap={6}>
      <Stack direction={{ md: 'row' }} gap={4}>
        <StatusCard flush={flush} />
        <BoundariesCard
          heading="Relay Boundaries"
          boundary={flush.boundary}
          boundaries={[
            'humidifier_on',
            'humidifier_off',
            'fan_on',
            'fan_off',
            'lights_on',
            'lights_off'
          ]}
        />
        <BoundariesCard
          heading="Warning Boundaries"
          boundary={flush.boundary}
          boundaries={[
            'humidity_min_warn',
            'humidity_max_warn',
            'co2_max_warn',
            'temperature_min_warn',
            'temperature_max_warn'
          ]}
        />
      </Stack>
      {flush.readings?.length > 0 && <Graph title="Trends" readings={flush.readings} />}
    </Stack>
  </Main>
}
