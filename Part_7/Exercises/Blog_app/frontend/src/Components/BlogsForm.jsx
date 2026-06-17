import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { useBlogsActions } from '../stores/useBlogs'

const BlogsForm = ({ user }) => {
  const { addBLog } = useBlogsActions()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    if (title !== '' && author !== '' && url !== '') {
      addBLog(newBlog, user)
      setTitle('')
      setAuthor('')
      setUrl('')
      navigate('/')
    }
  }
  return (
    <form onSubmit={submit}>
      <h1>Create New</h1>
      <TextField
        required
        label="Title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        id="title"
        sx={{
          width: '40%',
          marginBottom: '12px',
        }}
      />
      <br />
      <TextField
        required
        label="Author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        id="author"
        sx={{
          width: '40%',
          marginBottom: '12px',
        }}
      />
      <br />
      <TextField
        required
        label="Url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        id="url"
        sx={{
          width: '40%',
          marginBottom: '1rem',
        }}
      />
      <br />
      <Button type="submit" variant="contained">
        Create
      </Button>
    </form>
  )
}

export default BlogsForm
