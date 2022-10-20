import styles from '@/styles/modules/auth.module.css'
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { createUserEP, signInEP, signupWithService } from "shared/utility/auth"
import { NewAuth, SignInAuth } from 'shared/utility/types'
import BtnWithImg from './BtnWithImg'
import { useRouter } from 'next/router'
import useFirebaseAuth from 'frontend/hooks/useFirebaseAuth'
import ErrorMessage from './ErrorMessages'

export default function Auth({authType} : any) {
  const authStatus = useFirebaseAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

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
            placeholder='nick'
          />
        </>
      )
    }
  }

  function emailAuth() {
    if (authType === 'login') {
      signInEP({email, password} as SignInAuth, dispatch, router)
    } else {
      createUserEP({ email, displayName, password } as NewAuth, dispatch, router)
    }
  }

  function signup(service: string) {
    signupWithService(service, dispatch, router)
  }

  return (
    <section className={styles.authContainer}>
      <ErrorMessage />
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
          onClick={emailAuth}
          className={styles.authButton}
        >{authType === 'login' ? 'Login': 'Sign Up'}</button>
      </section>
      <section className={styles.withServices}>
        <BtnWithImg
          action={() => signup('Google')}
          img='/assets/btn_google_light_normal_ios.svg'
          title='Sign in with Google'
          style='googleSignIn'
        />
        <BtnWithImg
          action={() => signup('Facebook')}
          img='/assets/f_logo_RGB-White_1024.png'
          title='Sign in with Facebook'
          style='facebookSignIn'
        />
        <BtnWithImg
          action={() => signup('Apple')}
          img='/assets/Logo - SIWA - Logo-only - White.svg'
          title='Sign in with Apple'
          style='appleSignIn'
        />
      </section>
    </section>
  )
}