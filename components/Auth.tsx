import styles from '@/styles/modules/auth.module.css'
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { createUserEP, signupWithFacebook, signupWithGoogle, signupWithApple } from "utility/auth"
import { NewAuth } from 'utility/types'
import BtnWithImg from './BtnWithImg'
import Script from 'next/script'

export default function Auth({authType} : any) {
  const [email, setEmail] = useState('')
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
      <section className={styles.withEmail}>
        <label className={styles.authLabel}>Email</label>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.authInput}
          placeholder='waypoint@email.com'
        />
        {showSignUp()}
        <label className={styles.authLabel}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.authInput}
          placeholder='password'
        />
        <button
          onClick={() => createUserEP(payload(), dispatch)}
          className={styles.authButton}
        >Login</button>
      </section>
      <hr className={styles.authDivider}></hr>
      <section className={styles.withServices}>
        <BtnWithImg
          action={() => signupWithGoogle(dispatch)}
          img='/assets/btn_google_light_normal_ios.svg'
          title='Sign in with Google'
          style='googleSignIn'
        />
        <BtnWithImg
          action={() => signupWithFacebook(dispatch)}
          img='/assets/f_logo_RGB-White_1024.png'
          title='Sign in with Facebook'
          style='facebookSignIn'
        />
        <BtnWithImg
          action={() => signupWithApple(dispatch)}
          img='/assets/Logo - SIWA - Logo-only - White.svg'
          title='Sign in with Apple'
          style='appleSignIn'
        />
      </section>
    </section>
  )
}