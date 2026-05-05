import { useParams } from 'react-router-dom'

const Blog = ({blogs, putBlogs, deleted, user}) =>{
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

   const confirDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleted(blog.id)
    }
  }

   const hidenDelete = () => {
    if (user && (user.id === blog.user.id || user.id === blog.user)) {
      return(<button onClick={() => confirDelete()} >Remove</button>)
    } else {
      return null
    }
  }

  if (blog) {
    return (
      <>
        <h1>{blog.author}: {blog.title}</h1>
        <a href="">{blog.url}</a>
        <div>
          likes {blog.likes}
          {user ?<button onClick={() => putBlogs(blog)}>like</button> : null}
        </div>
        Added by: {blog.user.username}
         {user?hidenDelete() :null}
      </>
    )
  }
  else {return null}
}

export default Blog