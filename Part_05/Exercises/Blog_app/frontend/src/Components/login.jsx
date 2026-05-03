import {useState} from 'react'
import {useNavigate } from 'react-router-dom'

const Login = ({ handlLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  
  const loginSend = (event) => {
    event.preventDefault()
    handlLogin(password, username)
    setUsername('')
    setPassword('')
    navigate('/')
  }
  return(
    <>
      <h1>log in to application</h1>
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
    </>
  )
}

export default Login
