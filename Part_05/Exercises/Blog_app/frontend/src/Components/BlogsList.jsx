import { Link } from 'react-router-dom'

const BlogsList = ({ blogs }) => {
  const blogsSort = [...blogs].sort(function (a, b) {
    return  b.likes - a.likes
  })

  return(
    <>
      <h1>blogs</h1>
      <div data-testid='blog-list'>
        <ul>
          {blogsSort.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
        </ul>
      </div>
    </>
  )
}

export default BlogsList