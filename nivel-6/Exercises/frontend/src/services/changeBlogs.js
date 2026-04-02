import axios from 'axios'
const baseUrl = '/api/blogs/'


const changeBlogs = async (newBlog) => {
  const id = newBlog.id
  const request = await axios.put(`${baseUrl}${id}`, newBlog)
  const response = request.data
  return response
}

export default { changeBlogs }