import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { useUserActions } from '../stores/userStore'

const Login = () => {
  const { login } = useUserActions()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const loginSend = (event) => {
    event.preventDefault()
    login(password, username)
    setUsername('')
    setPassword('')
    navigate('/')
  }
  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={loginSend}>
        <TextField
          label="username"
          variant="standard"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
        <br />
        <TextField
          label="password"
          variant="standard"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
        <br />
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          login
        </Button>
      </form>
    </>
  )
}

export default Login
