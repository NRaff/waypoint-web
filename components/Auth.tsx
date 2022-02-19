import styles from '@/styles/modules/auth.module.css'
import { useState } from "react"
import { createUserEP } from "utility/auth"

export default function Auth({authType} : any) {
  const [email, setEmail] = useState('nick')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  function showSignUp() {
    if (authType === 'login') {
      return null
    } else {
      return (
        <>
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
        </>
      )
    }
  }

  return (
    <section className={styles.authContainer}>
      <label>Email</label>
      <input 
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {showSignUp()}
      <label>Password</label>
      <input 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={() => createUserEP(email,password)}
      >Login</button>
    </section>
  )
}