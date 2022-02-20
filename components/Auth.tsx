import styles from '@/styles/modules/auth.module.css'
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { createUserEP, signupWithGoogle, signInOptions } from "utility/auth"
import { NewAuth } from 'utility/types'

export default function Auth({authType} : any) {
  const [email, setEmail] = useState('nick')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const dispatch = useDispatch()

  function showSignUp() {
    if (authType === 'login') {
      return null
    } else {
      return (
        <>
          <label className={styles.authLabel}>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className={styles.authInput}
          />
        </>
      )
    }
  }

  function payload() {
    return({
      email,
      displayName,
      password
    }) as NewAuth
  }

  return (
    <section className={styles.authContainer}>
      <label className={styles.authLabel}>Email</label>
      <input 
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={styles.authInput}
      />
      {showSignUp()}
      <label className={styles.authLabel}>Password</label>
      <input 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className={styles.authInput}
      />
      <button
        onClick={() => createUserEP(payload(), dispatch)}
        className={styles.authButton}
      >Login</button>
      <button
        onClick={() => signupWithGoogle(dispatch)}
        className={styles.authButton}
      >Signup with Google</button>
    </section>
  )
}