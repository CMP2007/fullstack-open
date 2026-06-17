import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BlogsList from './Components/BlogsList'
import Blogs from './services/blogs'
import { useBlogsActions } from './stores/useBlogs'
import Login from './Components/login'
import LoginService from './services/login'
import BlogsForm from './Components/BlogsForm'
import Notification from './Components/alerts'
import Blog from './Components/Blog'
import ErrorBoundary from './Components/UI/ErrorBoundary'
import Error404 from './Components/UI/Error404'
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material'

const App = () => {
  const [user, setUser] = useState(null)
  const { initialize } = useBlogsActions()

  useEffect(() => {
    Blogs.getAll().then((response) => initialize(response))
  }, [initialize])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(user)
    }
  }, [])

  const handlLogin = async (password, username) => {
    try {
      const response = await LoginService.login({ password, username })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(response))
      setUser(response)
    } catch {
      timeNotification('wrong username or password', 'error')
    }
  }

  const closeSession = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ fontSize: '20px', flexGrow: 1 }}>
              Blog App
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Blogs
            </Button>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/newBlog">
                  new blog
                </Button>
                <Button color="inherit" onClick={closeSession}>
                  logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Notification />
        <ErrorBoundary>
          <Routes>
            <Route path="/blogs/:id" element={<Blog user={user} />} />
            <Route path="/" element={<BlogsList />} />
            <Route path="newBlog" element={<BlogsForm user={user} />} />
            <Route path="/login" element={<Login handlLogin={handlLogin} />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </Container>
  )
}

export default App
