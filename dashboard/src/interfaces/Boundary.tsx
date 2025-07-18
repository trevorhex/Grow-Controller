import { Stage } from './Flush'

export interface Boundary {
  id: number
  humidifier_off: number
  humidifier_on: number
  humidity_min_warn: number
  humidity_max_warn: number
  fan_off: number
  fan_on: number
  co2_max_warn: number
  temperature_min_warn: number
  temperature_max_warn: number
  lights_on: string
  lights_off: string
  stage: Stage
  flush_id: number
}
