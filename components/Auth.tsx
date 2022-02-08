import { useState } from "react"

export default function Auth({authType} : any) {
  const [username, setUsername] = useState('nick')
  const [password, setPassword] = useState('')
  return (
    <section>
      <label>Username</label>
      <input 
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
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