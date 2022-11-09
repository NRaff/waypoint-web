import Link from "next/link";
import Logo from "./Logo";
// import styles from '@/styles/modules/waypointNav.module.css'
import ProfileNavItem from "./ProfileNavItem";
import { UserButton } from "@clerk/nextjs";
import { AppBar, Container, Typography } from "@mui/material";
import { StyleSheet } from "frontend/framework/utils/types";
import { Label } from "@mui/icons-material";

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