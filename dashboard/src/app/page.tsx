'use client'

import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { FlushData } from '@/interfaces/Flush'

import Main from '@/components/templates/Main'
import CurrentFlushPage from '@/components/pages/CurrentFlush'

export default function IndexPage() {
  const [flush, setFlush] = useState<FlushData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchFlushData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/flushes/current`)
      
      if (response.ok) {
        const result = await response.json()
        setFlush(result)
      }
    } catch (err) {
      console.log('Error fetching flush data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFlushData()
  }, [])

  if (loading) {
    return (
      <Main>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Main>
    )
  }

  return <CurrentFlushPage flush={flush} />
}
