import Link from 'next/link'

import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import { drawerWidth } from '@/components/templates/Main'
import { ROUTES } from '@/config/routes'

export interface HeaderProps {
  open: boolean
  onOpenDrawer: () => void
}

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}))

export default function Header({ open, onOpenDrawer }: HeaderProps) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpenDrawer}
          edge="start"
          sx={[{ mr: 2 }, open && { display: 'none' }]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          <Link href={ROUTES.HOME} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
            Grow Controller Dashboard
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
