import { useState, useEffect, useRef } from 'react'
import BlogsList from './Components/BlogsList'
import Blogs from './services/blogs'
import Login from './Components/login'
import LoginServise from './services/login'
import BlogsForm from './Components/BlogsForm'
import createBlog from './services/CreateBlog'
import  chageBlogs from './services/changeBlogs'
import deletedBlogs from './services/deletedBlogs'
import Notification from './Components/alerts'
import Togglable from './Components/Togglable'
import './index.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ text:null, style:null })

  const blogRef  = useRef()

  useEffect(() => {
    if (user) {
      Blogs
        .getAll()
        .then( response => {
          setBlogs(response)
        })
    }
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
      const response = await LoginServise.login({ password, username })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(response)
      )
      setUser(response)
    }
    catch {
      setNotification({ text:'wrong username or password', style:'error' })
      setTimeout(() => {
        setNotification({ text:null, style:null })
      },5000)
    }
  }

  const handlBlog = async (newBlog) => {
    try{
      blogRef.current.toggleVisibility()
      const response = await createBlog.CreateBlogs(newBlog, user.token)
      setBlogs(blogs.concat(response))
      setNotification({ text:`a new blog ${response.title} by ${response.author} added`, style:'alert' })
      setTimeout(() => {
        setNotification({ text:null, style:null })
      },5000)
    }
    catch (exception){
      console.error('Error detallado:', exception)
      setNotification({ text:`Error registering the blog ${newBlog.title} by ${newBlog.author}`, style:'error' })
      setTimeout(() => {
        setNotification({ text:null, style:null })
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
      setNotification({ text:`a vote for ${response.title} by ${response.author} added`, style:'alert' })
      setTimeout(() => {
        setNotification({ text:null, style:null })
      },5000)
    }
    catch (exception){
      console.error('Error detallado:', exception)
      setNotification({ text:`Error registering the vote ${newBlog.title} by ${newBlog.author}`, style:'error' })
      setTimeout(() => {
        setNotification({ text:null, style:null })
      },5000)
    }
  }

  const deletedB = async (id) => {
    const blogD = blogs.find(blog => blog.id === id)
    try{
      await deletedBlogs.deletedBlogs(id, user.token)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotification({ text:`the blog ${blogD.title} by ${blogD.author} has been successfully deleted`, style:'alert' })
      setTimeout(() => {
        setNotification({ text:null, style:null })
      },5000)
    }
    catch (exception){
      console.error('Error detallado:', exception)
      setNotification({ text:`Error deleting the blog ${blogD.title} by ${blogD.author}`, style:'error' })
      setTimeout(() => {
        setNotification({ text:null, style:null })
      },5000)
    }
  }


  const closeSession = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const display = user => {
    if (!user) {
      return(
        <>
          <h1>log in to application</h1>
          <Notification message = {notification.text} style={notification.style}/>
          <Login handlLogin={handlLogin}/>
        </>
      )
    } else {
      return(
        <>
          <h1>blogs</h1>
          <Notification message = {notification.text} style={notification.style}/>
          <b>{user.name} logged in </b>
          <button onClick={closeSession}>logout</button>
          <Togglable buttonLabel="create new blog" ref={blogRef} >
            <BlogsForm handlBlog={handlBlog}/>
          </Togglable>
          <BlogsList blogs={blogs} putBlogs={putBlogs} deleted={deletedB} user={user} />
        </>
      )
    }
  }

  return (
    <>
      {display(user)}
    </>
  )
}

export default App