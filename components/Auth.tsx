import { useState } from "react"

export default function Auth({authType} : any) {
  const [username, setUsername] = useState('nick')
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
    <section>
      <label>Username</label>
      <input 
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      {showSignUp()}
      <label>Password</label>
      <input 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={() => console.log('login was clicked')}
      >Login</button>
    </section>
  )
}