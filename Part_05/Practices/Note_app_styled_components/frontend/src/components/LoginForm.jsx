import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          <label>
            username
            <input
              type="text"
              data-testid= 'username'
              value={username}
              name="Username"
              onChange={({ target }) =>  setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
              password
            <input
              type="password"
              data-testid='password'
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm