import { useParams } from 'react-router-dom'
import {useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Link, CardActions, Box, Button } from '@mui/material'

const Blog = ({blogs, putBlogs, deleted, user}) =>{
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  
  const navigate = useNavigate()

   const confirDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleted(blog.id)
      navigate('/')
    }
  }

   const hidenDelete = () => {
    if (user && (user.id === blog.user.id || user.id === blog.user)) {
      return(<Button variant="outlined" size="small" color="error" onClick={() => confirDelete()}>REMOVE</Button>)
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
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                {blog.likes} likes
              </Typography>
              {user 
                ?<Button variant="outlined" size="small" onClick={() => putBlogs(blog)}>LIKE</Button>
                :null
              }
              {user?hidenDelete() :null}
            </Box>
          </CardActions>
        </CardContent>
      </Card>
    )
  }
  else {return null}
}

export default Blog