import { NavItemProps } from "utility/types"
import styles from "../styles/modules/sidebarNavItem.module.css"

export default function SidebarNavItem({ action, title, style }: NavItemProps) {
  console.log(styles)
  return (
    <button
      onClick={() => action()}
      className={`${styles.sidebarNavItem} ${styles[style]}`}
    >
      <h3 className={styles.sidebarNavItem}><span>{title}</span></h3>
    </button>
  )
}