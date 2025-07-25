import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/api/config'
import { ROUTES } from '@/config/routes'

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_URL}${ROUTES.FLUSHES}/new`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create new flush' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating flush:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
