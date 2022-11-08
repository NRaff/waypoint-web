import Logo from "@/components/Logo";
import Auth from "frontend/components/Auth";
import { useRouter } from "next/router";
import styles from '../../styles/modules/openNav.module.css'

export default function Login() {
  const router = useRouter()
  const { authType } = router.query

  return (
    <>
      <nav className={styles.navBar}>
        <Logo />
      </nav>
      <Auth authType={authType} />
    </>
  )
}