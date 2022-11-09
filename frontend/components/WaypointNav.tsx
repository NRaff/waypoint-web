import Logo from "./Logo";
import { UserButton } from "@clerk/nextjs";
import { AppBar, Container } from "@mui/material";
import { StyleSheet } from "frontend/framework/utils/types";

const styles: StyleSheet = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '.1rem'
  },
  appBar: {
    borderRadius: '.2rem'
  }
}

const WaypointNav = () => {
  return (
    <AppBar position="static" sx={styles.appBar}>
      <Container maxWidth="xl" sx={styles.container}>
        <Logo />
        <UserButton />
      </Container>
    </AppBar>
  )
}

export default WaypointNav