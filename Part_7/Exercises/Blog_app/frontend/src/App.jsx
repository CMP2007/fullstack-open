import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import ErrorBoundary from './Components/ErrorBoundary'
import BlogsList from './Components/BlogsList'
import Blogs from './services/blogs'
import Login from './Components/login'
import LoginService from './services/login'
import BlogsForm from './Components/BlogsForm'
import createBlog from './services/CreateBlog'
import  chageBlogs from './services/changeBlogs'
import deletedBlogs from './services/deletedBlogs'
import Notification from './Components/alerts'
import Blog from './Components/Blog'
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    Blogs
      .getAll()
      .then( response => {
        setBlogs(response)
      })
  },[user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(user)
    }
  }, [])

  const handlLogin = async (password, username ) => {
    try{
      const response = await LoginService.login({ password, username })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(response)
      )
      setUser(response)
    }
    catch {
      setNotification({ text:'wrong username or password', type:'error' })
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
  }

  const handlBlog = async (newBlog) => {
    try{
      const response = await createBlog.CreateBlogs(newBlog, user.token)
      setBlogs(blogs.concat(response))
      setNotification({ text:`a new blog ${response.title} by ${response.author} added`, type:'success' })
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
    catch (exception){
      console.error('Error detallado:', exception)
      setNotification({ text:`Error registering the blog ${newBlog.title} by ${newBlog.author}`, type:'error' })
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
  }

  const putBlogs = async (blog) => {
    const userData = blog.user
    const newBlog = { ...blog, likes: blog.likes +1, user: blog.user.id }
    try{
      const response = await chageBlogs.changeBlogs(newBlog)
      const userAndBlog = { ...response, user: userData }
      setBlogs(blogs.map(blog => blog.id !== newBlog.id ? blog : userAndBlog))
      setNotification({ text:`a vote for ${response.title} by ${response.author} added`, type:'success' })
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
    catch (exception){
      console.error('Error detallado:', exception)
      setNotification({ text:`Error registering the vote ${newBlog.title} by ${newBlog.author}`, type:'error' })
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
  }

  const deletedB = async (id) => {
    const blogD = blogs.find(blog => blog.id === id)
    try{
      await deletedBlogs.deletedBlogs(id, user.token)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotification({ text:`the blog ${blogD.title} by ${blogD.author} has been successfully deleted`, type:'success' })
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
    catch (exception){
      console.error('Error detallado:', exception)
      setNotification({ text:`Error deleting the blog ${blogD.title} by ${blogD.author}`, type:'error' })
      setTimeout(() => {
        setNotification(null)
      },5000)
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
            <Button color="inherit" component={Link} to="/" >Blogs</Button>
            {user 
              ? <>
                  <Button color="inherit" component={Link} to="/newBlog" >new blog</Button>
                  <Button color="inherit" onClick={closeSession} >logout</Button> 
                </> 
              : <Button color="inherit" component={Link} to="/login" >Login</Button>
            }
          </Toolbar>
        </AppBar>

        <Notification notification = {notification}/>
        <ErrorBoundary>
          <Routes>
            <Route path="/blogs/:id" element={
              <Blog blogs={blogs} putBlogs={putBlogs} deleted={deletedB} user={user}/>
            } />
            <Route path='/' element={
              <BlogsList blogs={blogs} />
            } />
            <Route path='newBlog' element={
              <BlogsForm handlBlog={handlBlog}/>
            } />
            <Route path='/login' element={
              <Login handlLogin={handlLogin}/>
            } />
          </Routes>
        </ErrorBoundary>
      </Router>
    </Container>
  )
}

export default App