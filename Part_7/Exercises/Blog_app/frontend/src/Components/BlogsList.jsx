import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
} from '@mui/material'
import { useBlogs } from '../stores/blogStore'

const BlogsList = () => {
  const blogs = useBlogs()

  const blogsSort = [...blogs].sort(function (a, b) {
    return b.likes - a.likes
  })

  return (
    <Box sx={{ margin: '0 auto', p: 3, maxWidth: '95%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Blogs
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />
      <Stack spacing={2.5} data-testid="blog-list">
        {blogsSort.map((blog) => (
          <Card
            key={blog.id}
            elevation={1}
            sx={{
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
            }}
          >
            <CardActionArea component={RouterLink} to={`/blogs/${blog.id}`}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  color="text.primary"
                  sx={{ fontWeight: 600 }}
                >
                  {blog.title}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: 'block', fontWeight: 500 }}
                >
                  By {blog.author || 'Unknown Author'}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

export default BlogsList
