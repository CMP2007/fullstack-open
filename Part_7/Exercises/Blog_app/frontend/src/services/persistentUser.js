const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}
const saveUser = (user) =>
  window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

const removeUser = () => window.localStorage.removeItem('loggedBlogUser')

export default { getUser, saveUser, removeUser }
