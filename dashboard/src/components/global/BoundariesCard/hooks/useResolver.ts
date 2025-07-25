import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function useResolver() {
  const schema = yup.object({
    humidifier_on: yup.string().required().optional(),
    humidifier_off: yup.string().required().optional(),
    humidity_min_warn: yup.string().required().optional(),
    humidity_max_warn: yup.string().required().optional(),
    fan_on: yup.string().required().optional(),
    fan_off: yup.string().required().optional(),
    co2_max_warn: yup.string().required().optional(),
    temperature_min_warn: yup.string().required().optional(),
    temperature_max_warn: yup.string().required().optional(),
    lights_on: yup.string().required().optional(),
    lights_off: yup.string().required().optional(),
    stage: yup.string().required().optional()
  })

  return yupResolver(schema as any)
}
