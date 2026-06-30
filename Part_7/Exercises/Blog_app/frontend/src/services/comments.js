import axios from 'axios'
const baseUrl = '/api/blogs'

const getCommentsBlog = async (idBlog) => {
  const request = await axios.get(`${baseUrl}/${idBlog}/comments`)
  const response = request.data
  return response
}

const addComment = async (newComment) => {
  const request = await axios.post(
    `${baseUrl}/${newComment.blogId}/comments`,
    newComment,
  )
  const response = request.data
  return response
}

export default { getCommentsBlog, addComment }
