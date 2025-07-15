'use client'

import { ElementType } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@mui/material/styles'

import List from '@mui/material/List'
import MuiListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CompostOutlinedIcon from '@mui/icons-material/CompostOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'

import { ROUTES } from '@/config/routes'

interface ListItemProps {
  icon: ElementType
  text: string
  href: string
}

const ListItem = ({ icon: Icon, text, href }: ListItemProps) => {
  const pathname = usePathname()
  const theme = useTheme()
  const isActive = pathname === href
  const color = {
    [ROUTES.HOME]: theme.palette.primary.main,
    [ROUTES.WARNINGS]: theme.palette.secondary.main,
    [ROUTES.PREVIOUS]: theme.palette.info.main
  }[pathname]

  return (
    <MuiListItem disablePadding>
      <Link href={href} passHref style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
        <ListItemButton 
          selected={isActive}
          sx={{
            '&.Mui-selected': {
              backgroundColor: `${color}30`,
              '&:hover': { backgroundColor: `${color}60` }
            }
          }}
        >
          <ListItemIcon sx={{ color: isActive ? color : 'inherit' }}>
            <Icon sx={{ fontSize: '1.7rem' }} />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </Link>
    </MuiListItem>
  )
}

const items: ListItemProps[] = [
  { icon: CompostOutlinedIcon, text: 'Current Flush', href: ROUTES.HOME },
  { icon: WarningAmberOutlinedIcon, text: 'Warnings', href: ROUTES.WARNINGS },
  { icon: ArchiveOutlinedIcon, text: 'Previous Flushes', href: ROUTES.PREVIOUS }
]

export default function SideMenu() {
  return (
    <List>
      {items.map((item, index) => <ListItem key={index} {...item} />)}
    </List>
  )
}
