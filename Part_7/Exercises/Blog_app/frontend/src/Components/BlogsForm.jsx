import useField from '../services/useField'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { useBlogsActions } from '../stores/blogStore'
import { useUser } from '../stores/userStore'

const BlogsForm = () => {
  const user = useUser()
  const { addBLog } = useBlogsActions()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    if (title.value !== '' && author.value !== '' && url.value !== '') {
      addBLog(newBlog, user)
      title.reset()
      author.reset()
      url.reset()
      navigate('/')
    }
  }
  return (
    <form onSubmit={submit}>
      <h1>Create New</h1>
      <TextField
        required
        label="Title"
        value={title.value}
        onChange={title.onChange}
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
        value={author.value}
        onChange={author.onChange}
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
        value={url.value}
        onChange={url.onChange}
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
