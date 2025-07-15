import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/api/config'
import { ROUTES } from '@/config/routes'

interface Params {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    console.log('Fetching flush data for ID:', params.id)
    const response = await fetch(`${API_URL}${ROUTES.FLUSHES}/${params.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch flush data' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching flush data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
