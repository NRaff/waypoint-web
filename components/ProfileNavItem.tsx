import { useSession } from "utility/selectors";
import styles from '@/styles/modules/profileNavItem.module.css'
import { signOut } from "utility/auth";

export default function ProfileNavItem() {
  const { displayName, photoUrl } = useSession() 
  return (
    <menu 
      className={styles.profileMenu}
      onClick={() => signOut()}
    >
      <h1>{displayName || 'User'}</h1>
      {photoUrl ?
        // 
        <img
          src={photoUrl}
          alt="profileImage"
          className={styles.profileImage}
        />
        : null
      }
    </menu>
  )
}