import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function useResolver() {
  const schema = yup.object().shape({
    // TODO
  })

  return yupResolver(schema)
}
