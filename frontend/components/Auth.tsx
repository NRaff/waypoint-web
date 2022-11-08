import styles from '@/styles/modules/auth.module.css'
import { SignIn, SignUp } from '@clerk/nextjs'

export default function Auth({authType} : any) {

  return (
    <section className={styles.authContainer}>
      {authType === 'signup' ?
        <SignUp 
          redirectUrl={'http://localhost:3000/'}
          signInUrl={'http://localhost:3000/auth/login'}
        /> :
        <SignIn
          redirectUrl={'http://localhost:3000/'}
          signUpUrl={'http://localhost:3000/auth/signup'}
        />
      }
    </section>
  )
}