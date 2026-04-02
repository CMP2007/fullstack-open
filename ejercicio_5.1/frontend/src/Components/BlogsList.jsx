import TogglableBlogs from './TogglableBlogs'

const BlogsList = ({ blogs, putBlogs, deleted, user }) => {
  const blogsSort = [...blogs].sort(function (a, b) {
    return  b.likes - a.likes
  })

  return(
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
  )
}

export default BlogsList