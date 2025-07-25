'use client'

import { useState } from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { FlushData } from '@/interfaces/Flush'
import Main from '@/components/templates/Main'
import Graph from '@/components/global/Graph'
import StatusCard from '@/components/global/StatusCard'
import BoundariesCard from '@/components/global/BoundariesCard'

export interface CurrentFlushPageProps {
  flush: FlushData | null
}

export default function CurrentFlushPage({ flush }: CurrentFlushPageProps) {
  const [loading, setLoading] = useState(false)

  const handleCreateFlush = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/flushes/new', { method: 'GET' })
      
      if (response.ok) {

      } else {
        console.error('Failed to create flush:', response.statusText)
      }
    } catch (error) {
      console.error('Error creating flush:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!flush || flush.error) {
    return <Main>
      <Stack gap={6} alignItems="center">
        <Typography variant="h4" textAlign="center">No current flush.</Typography>
        <Button variant="contained" onClick={handleCreateFlush} loading={loading}>Create New Flush</Button>
      </Stack>
    </Main>
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
