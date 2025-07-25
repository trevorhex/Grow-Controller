import { KeyboardEvent } from 'react'

export const ALLOWED_NUMBER_MASK_KEYS = ['.', 'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight']

export const maskNumberInput = (e: KeyboardEvent<HTMLDivElement>, value: string) => {
  if (!/[0-9]/.test(e.key) && !ALLOWED_NUMBER_MASK_KEYS.includes(e.key)) e.preventDefault()
  if (e.key === '.' && value.includes('.')) e.preventDefault()
}
