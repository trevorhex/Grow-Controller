import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/api/config'
import { ROUTES } from '@/config/routes'

interface Params {
  params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const response = await fetch(`${API_URL}${ROUTES.BOUNDARIES}/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(await request.json())
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to update boundary data' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating boundary data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
