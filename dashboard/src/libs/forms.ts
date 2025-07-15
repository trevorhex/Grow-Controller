import { KeyboardEvent } from 'react'

export const maskNumberInput = (e: KeyboardEvent<HTMLDivElement>, value: string) => {
  if (!/[0-9]/.test(e.key) && !['.', 'Backspace', 'Delete', 'Tab'].includes(e.key)) e.preventDefault()
  if (e.key === '.' && value.includes('.')) e.preventDefault()
}
