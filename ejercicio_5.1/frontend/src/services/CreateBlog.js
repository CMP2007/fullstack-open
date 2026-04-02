import axios from 'axios'
const baseUrl = '/api/blogs'

const CreateBlogs = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const request = await axios.post(baseUrl, newBlog, config)
  const response = request.data
  return response
}

export default { CreateBlogs }