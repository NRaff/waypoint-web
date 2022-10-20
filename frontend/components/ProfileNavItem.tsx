import { useSession } from "shared/utility/selectors";
import styles from '@/styles/modules/profileNavItem.module.css'
import { signOut } from "shared/utility/auth";

export default function ProfileNavItem({type}:any) {
  const { displayName, photoUrl } = useSession()

  function initials() {
    const parts = displayName.split(' ')
    const letters = parts.map((part: string) => part[0])
    return letters.join('')
  }

  return (
    <menu 
      className={styles.profileMenu}
      onClick={() => signOut()}
    >
      {type === 'Full' ? <h1>{displayName || 'User'}</h1> : null}
      {photoUrl ?
        // 
        <img
          src={photoUrl}
          alt="profileImage"
          className={styles.profileImage}
        />
        : <h1>{initials()}</h1>
      }
    </menu>
  )
}