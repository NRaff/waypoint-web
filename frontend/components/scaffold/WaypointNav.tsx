import Logo from "../Logo";
import { UserButton } from "@clerk/nextjs";
import { IconButton, styled, Toolbar } from "@mui/material";
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import { StyleSheet } from "frontend/framework/utils/types";
import { Menu } from "@mui/icons-material";

interface NavBarProps extends AppBarProps {
  open: boolean,
  openHandler: () => void,
  baseWidth: number,
}

const NavBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<NavBarProps>(({theme, open, baseWidth}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: baseWidth,
    width: `calc(100% - ${baseWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const WaypointNav: React.FC<NavBarProps> = ({
  open,
  openHandler,
  baseWidth
}) => {
  return (
    <NavBar position="fixed" open={open} openHandler={openHandler} baseWidth={baseWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openHandler}
            edge="start"
            sx={{
              ...(open && { display: 'none' }),
            }}
          >
            <Menu />
          </IconButton>
          <Logo />
          <UserButton />
        </Toolbar>
      </NavBar>
  )
}

export default WaypointNav