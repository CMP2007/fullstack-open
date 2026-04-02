import axios from 'axios'
const baseUrl = '/api/blogs'

const deletedBlogs = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  const response = request.data
  return response
}

export default { deletedBlogs }