'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface DrawerContextType {
  open: boolean
  toggle: () => void}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  return (
    <DrawerContext.Provider value={{ open, toggle }}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (context === undefined) throw new Error('useDrawer must be used within a DrawerProvider')
  return context
}
