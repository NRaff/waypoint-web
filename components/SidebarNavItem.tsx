import { NavItemProps } from "utility/types"
import styles from "../styles/modules/sidebarNavItem.module.css"

export default function SidebarNavItem({ action, title, style, tooltip }: NavItemProps) {
  return (
    <button
      onClick={() => action()}
      className={`${styles.sidebarNavItem} ${styles[style]}`}
    >
      <h3 className={styles.sidebarNavItemHeader}><span>{title}</span></h3>
      <p className={styles.tooltip}><span>{tooltip}</span></p>
    </button>
  )
}