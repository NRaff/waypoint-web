import Link from "next/link";
import Logo from "./Logo";
import styles from '@/styles/modules/waypointNav.module.css'
import ProfileNavItem from "./ProfileNavItem";
import { UserButton } from "@clerk/nextjs";

const WaypointNav = () => {
  return (
    <nav className={styles.auth}>
      <Logo />
      <UserButton showName />
    </nav>
  )
}

export default WaypointNav