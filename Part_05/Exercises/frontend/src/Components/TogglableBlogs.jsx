import { useState } from 'react'

const TogglableBlogs = ({ blog, putBlogs, deleted, user }) => {
  const [details, setDetails] = useState(false)

  const showWhenVisible = { display: details ? '' : 'none' }
  const hidenWhenVisible = { display: details ? 'none' : '' }

  const labelButton = details
    ?'hide'
    :'view'

  const toggleDetails = () => {
    setDetails(!details)
  }

  const confirDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleted(blog.id)
    }
  }

  const hidenDelete = () => {
    if (user.id === blog.user.id || user.id === blog.user) {
      return(
        <>
          <button onClick={() => confirDelete()} >Remove</button><br />
        </>
      )
    } else {
      return null
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      <div style={blogStyle} data-testid='blog-item'>
        {blog.title} <span style={hidenWhenVisible}>{blog.author}</span>
        <button onClick={toggleDetails} name='viewHiden' >{labelButton}</button>
        <div style={showWhenVisible} className='showWhenVisible'>
          {blog.url} <br />
          <span className='likes-count'>{blog.likes}</span>
          <button onClick={() => putBlogs(blog)}>like</button><br />
          {blog.author} <br />
          {hidenDelete()}
        </div>
      </div>
    </>
  )
}

export default TogglableBlogs