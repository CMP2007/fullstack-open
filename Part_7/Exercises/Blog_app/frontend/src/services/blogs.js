import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  const response = request.data
  return response
}

const CreateBlogs = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const request = await axios.post(baseUrl, newBlog, config)
  const response = request.data
  return response
}

const changeBlogs = async (newBlog) => {
  const id = newBlog.id
  const request = await axios.put(`${baseUrl}/${id}`, newBlog)
  const response = request.data
  return response
}

const deletedBlogs = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  const response = request.data
  return response
}

export default { getAll, CreateBlogs, changeBlogs, deletedBlogs }
