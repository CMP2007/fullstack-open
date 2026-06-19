import useField from '../services/useField'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { useUserActions } from '../stores/userStore'

const Login = () => {
  const { login } = useUserActions()
  const username = useField('text')
  const password = useField('password')

  const navigate = useNavigate()

  const loginSend = (event) => {
    event.preventDefault()
    login(password.value, username.value)
    username.reset()
    password.reset()
    navigate('/')
  }
  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={loginSend}>
        <TextField
          label="username"
          variant="standard"
          value={username.value}
          onChange={username.onChange}
          id="username"
        />
        <br />
        <TextField
          label="password"
          variant="standard"
          type={password.type}
          value={password.value}
          onChange={password.onChange}
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
