import { useSession } from "utility/selectors";
import styles from '@/styles/modules/profileNavItem.module.css'
import { signOut } from "utility/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function ProfileNavItem() {
  const { displayName, photoUrl } = useSession() 
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <menu 
      className={styles.profileMenu}
      onClick={() => signOut(dispatch, router)}
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