import { UseFormReturn } from 'react-hook-form'
import { DateTime } from 'luxon'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

import { maskNumberInput } from '@/libs/forms'

import { BoundaryTypeType } from '../../index'

export interface FormFieldProps {
  form: UseFormReturn<Record<string, string>>
  name: string
  type: BoundaryTypeType
  units: string
  required?: boolean
}

export default function FormField({ name, form: { register, getValues, setValue, watch }, units, type, required = false }: FormFieldProps) {
  if (type === BoundaryTypeType.Time) {
    const value = watch(name)
    return <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en-us">
      <TimePicker
        {...register(name, { required })}
        onChange={val => setValue(name, val?.toISO() ?? '')}
        value={value ? DateTime.fromISO(value.replace(' ', 'T')) : null}
        slotProps={{ textField: { size: 'small' } }}
      />
    </LocalizationProvider>
  }

  return (
    <TextField
      {...register(name, { required })}
      onKeyDown={e => maskNumberInput(e, getValues(name))}
      size="small"
      slotProps={{
        input: {
          endAdornment: units &&
            <InputAdornment position="end">{units}</InputAdornment>
        }
      }}
    />
  )
}
