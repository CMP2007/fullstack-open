import {useState} from 'react'

const Login = ({ handlLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const loginSend = (event) => {
    event.preventDefault()
    handlLogin(password, username)
    setUsername('')
    setPassword('')
  }
  return(
    <form onSubmit={loginSend}>
      <label htmlFor="username"><b>username</b></label>
      <input type="text"
        name="username"
        id='username'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <label htmlFor="password"><b>password</b></label>
      <input
        type="password"
        name="Password"
        id='password'
        value={password}
        onChange={({ target }) => setPassword(target.value) }
      />
      <br />
      <button type="submit">login</button>
    </form>
  )
}

export default Login
