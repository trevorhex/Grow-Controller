'use client'

import { useState } from 'react'

import Button, { ButtonProps } from '@mui/material/Button'

export interface AsyncButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick: (setLoading: (loading: boolean) => void) => void
}

export default function AsyncButton({ onClick, ...props }: AsyncButtonProps) {
  const [loading, setLoading] = useState(false)
  return (
    <Button
      {...props}
      onClick={() => onClick(setLoading)}
      loading={loading}
    />
  )
}
