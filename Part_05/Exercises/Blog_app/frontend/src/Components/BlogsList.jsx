import TogglableBlogs from './TogglableBlogs'
import Notification from './alerts'

const BlogsList = ({ blogs, putBlogs, deleted, user }) => {
  const blogsSort = [...blogs].sort(function (a, b) {
    return  b.likes - a.likes
  })

  return(
    <>
      <h1>blogs</h1>
      <div data-testid='blog-list'>
        {blogsSort.map(blog =>
          <TogglableBlogs
            blog={blog}
            key={blog.id}
            putBlogs={putBlogs}
            deleted={deleted}
            user={user}
          />
        )}
      </div>
    </>
  )
}

export default BlogsList