import { useState, useEffect } from 'react'
import { useTimeNotification } from './stores/notificationStore'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BlogsList from './Components/BlogsList'
import Blogs from './services/blogs'
import Login from './Components/login'
import LoginService from './services/login'
import BlogsForm from './Components/BlogsForm'
import createBlog from './services/CreateBlog'
import chageBlogs from './services/changeBlogs'
import deletedBlogs from './services/deletedBlogs'
import Notification from './Components/alerts'
import Blog from './Components/Blog'
import ErrorBoundary from './Components/UI/ErrorBoundary'
import Error404 from './Components/UI/Error404'
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material'

const App = () => {
  const timeNotification = useTimeNotification()
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    Blogs.getAll().then((response) => {
      setBlogs(response)
    })
  }, [user])

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

  const handlBlog = async (newBlog) => {
    try {
      const response = await createBlog.CreateBlogs(newBlog, user.token)
      setBlogs(blogs.concat(response))
      timeNotification(
        `a new blog ${response.title} by ${response.author} added`,
        'success',
      )
    } catch (exception) {
      console.error('Error detallado:', exception)
      timeNotification(
        `Error registering the blog ${newBlog.title} by ${newBlog.author}`,
        'error',
      )
    }
  }

  const putBlogs = async (blog) => {
    const userData = blog.user
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    try {
      const response = await chageBlogs.changeBlogs(newBlog)
      const userAndBlog = { ...response, user: userData }
      setBlogs(
        blogs.map((blog) => (blog.id !== newBlog.id ? blog : userAndBlog)),
      )
      timeNotification(
        `a vote for ${response.title} by ${response.author} added`,
        'success',
      )
    } catch (exception) {
      console.error('Error detallado:', exception)
      timeNotification(
        `Error registering the vote ${newBlog.title} by ${newBlog.author}`,
        'error',
      )
    }
  }

  const deletedB = async (id) => {
    const blogD = blogs.find((blog) => blog.id === id)
    try {
      await deletedBlogs.deletedBlogs(id, user.token)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      timeNotification(
        `the blog ${blogD.title} by ${blogD.author} has been successfully deleted`,
        'success',
      )
    } catch (exception) {
      console.error('Error detallado:', exception)
      timeNotification(
        `Error deleting the blog ${blogD.title} by ${blogD.author}`,
        'error',
      )
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
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blogs={blogs}
                  putBlogs={putBlogs}
                  deleted={deletedB}
                  user={user}
                />
              }
            />
            <Route path="/" element={<BlogsList blogs={blogs} />} />
            <Route
              path="newBlog"
              element={<BlogsForm handlBlog={handlBlog} />}
            />
            <Route path="/login" element={<Login handlLogin={handlLogin} />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </Container>
  )
}

export default App
