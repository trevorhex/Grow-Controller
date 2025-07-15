import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Boundary } from '../index'

export default function useResolver(boundaries: Boundary[]) {
  const schema = yup.object().shape({
    // TODO
  })

  return yupResolver(schema)
}
