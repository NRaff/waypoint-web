import { AppBarProps, Box, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import { ChevronLeft, ChevronRight, EmojiEvents, Flag, Inbox, Mail, Menu, ShareLocation } from "@mui/icons-material";
import { ReactNode, useState } from "react";
import Logo from "../Logo";
import { UserButton } from "@clerk/nextjs";
import WaypointNav from './WaypointNav';

const baseWidth = 240

const MenuItems = {
  races: {
    title: 'Races',
    icon: <EmojiEvents />
  },
  courses: {
    title: 'Courses',
    icon: <ShareLocation />
  }
}

const openedStyle = (theme: Theme): CSSObject => ({
  width: baseWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden'
})

const closedStyle = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: baseWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedStyle(theme),
      '& .MuiDrawer-paper': openedStyle(theme),
    }),
    ...(!open && {
      ...closedStyle(theme),
      '& .MuiDrawer-paper': closedStyle(theme),
    }),
  }),
);

type WaypointContainerProps = {
  children: ReactNode
}

export const WaypointContainer: React.FC<WaypointContainerProps> = ({
  children
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <WaypointNav openHandler={handleDrawerOpen} open={open} baseWidth={baseWidth} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Object.values(MenuItems).map(({title, icon}) => (
            <ListItem key={title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        {/* 
          Retain drawer header here to preserve spacing (otherwise the content
          will be under the navbar) 
        */}
        <DrawerHeader/>
        {children}
      </Box>
    </Box>
  );
}