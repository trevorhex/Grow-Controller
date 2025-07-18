import { Reading } from '@/interfaces/Reading'
import { Boundary } from '@/interfaces/Boundary'

export interface Flush {
  id: number
  start_datetime: Date
  end_datetime: Date
  active: number
  current: number
  readings: Reading[]
  boundary: Boundary | null
  stage: Stage
}

export enum Stage {
  Pinning = 'pinning',
  Fruiting = 'fruiting'
}
