export interface Boundary {
  id: number
  temperature_min_warn: number
  temperature_max_warn: number
  humidity_min: number
  humidity_min_warn: number
  humidity_max: number
  humidity_max_warn: number
  co2_max: number
  co2_max_warn: number
  lights_on: string
  lights_off: string
  flush_id: number
}
