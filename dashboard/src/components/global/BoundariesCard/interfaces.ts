import { Boundary } from '@/interfaces/Boundary'

export interface BoundariesFormFields extends Omit<Boundary, 'id' | 'flush_id'> {}

export type BoundariesForm = Partial<Record<keyof BoundariesFormFields, string | number>>

export enum BoundaryType {
  Percentage = 'percentage',
  PPM = 'ppm',
  Temperature = 'temperature',
  Time = 'time'
}

export interface BoundaryView {
  label: string
  name: keyof BoundariesFormFields
  type: BoundaryType
}
