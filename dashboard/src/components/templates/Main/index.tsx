'use client'

import { Children, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import Header from '@/components/global/Header'
import SideMenu from '@/components/global/SideMenu'
import { useDrawer } from '@/contexts/DrawerContext'

export const drawerWidth = 300

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
      }
    }
  ]
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export default function MainTemplate({ children }: { children: React.ReactNode }) {
  const { open, toggle } = useDrawer()

  return (
    <Box sx={{ display: 'flex'}}>
      <Header open={open} onOpenDrawer={toggle} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton size="large" onClick={toggle}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <SideMenu />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container sx={{ pb: 8 }}>{children}</Container>
      </Main>
    </Box>
  )
}
          