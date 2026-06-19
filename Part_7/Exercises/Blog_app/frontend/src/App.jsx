import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useBlogsActions } from './stores/blogStore'
import { useUser, useUserActions } from './stores/userStore'
import BlogsList from './Components/BlogsList'
import Login from './Components/login'
import BlogsForm from './Components/BlogsForm'
import Notification from './Components/alerts'
import Blog from './Components/Blog'
import ErrorBoundary from './Components/UI/ErrorBoundary'
import UsersList from './Components/UsersList'
import Error404 from './Components/UI/Error404'
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material'

const App = () => {
  const { initializeUser, closeSession } = useUserActions()
  const user = useUser()
  const { initialize } = useBlogsActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

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
                <Button color="inherit" component={Link} to="/users">
                  users
                </Button>
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
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/" element={<BlogsList />} />
            <Route path="newBlog" element={<BlogsForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </Container>
  )
}

export default App
