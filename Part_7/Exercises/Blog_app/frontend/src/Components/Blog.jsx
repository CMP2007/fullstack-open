import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useBlogs, useBlogsActions } from '../stores/blogStore'
import { useUser } from '../stores/userStore'
import CommentsList from './CommentsList'
import CommentsForm from './CommentsForm'
import {
  Card,
  CardContent,
  Typography,
  Link,
  CardActions,
  Box,
  Button,
} from '@mui/material'

const Blog = () => {
  const user = useUser()
  const blogs = useBlogs()
  const { changeBlog, deleteBlog } = useBlogsActions()

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const navigate = useNavigate()

  const confirDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleteBlog(blog.id, user)
      navigate('/')
    }
  }

  const hidenDelete = () => {
    if (user && (user.id === blog.user.id || user.id === blog.user)) {
      return (
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => confirDelete()}
        >
          REMOVE
        </Button>
      )
    } else {
      return null
    }
  }

  if (blog) {
    return (
      <Card elevation={2} sx={{ maxWidth: 800, marginTop: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {blog.title}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            By: {blog.author}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <Link href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </Link>
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Added by: "{blog.user.username}"
          </Typography>

          <CardActions sx={{ paddingLeft: 0, marginTop: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 'bold' }}
              >
                {blog.likes} likes
              </Typography>
              {user ? (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => changeBlog(blog)}
                >
                  LIKE
                </Button>
              ) : null}
              {user ? hidenDelete() : null}
            </Box>
          </CardActions>
          <h3>Comments</h3>
          <CommentsForm />
          <CommentsList />
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}

export default Blog
