import { useUsersList, useUsersListActions } from '../stores/usersListStore'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const User = () => {
  const usersList = useUsersList()
  const { getUsersList } = useUsersListActions()
  const id = useParams().id

  useEffect(() => {
    if (!usersList) {
      getUsersList()
    }
  }, [usersList, getUsersList])

  if (!usersList) {
    return <p>Loading user data...</p>
  }

  const user = usersList.find((b) => b.id === id)

  return (
    <div>
      <h1>{user.username}</h1>
      <h3>added Blogs</h3>
      {user.blogs.length <= 0 ? (
        <p>no blogs created</p>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default User
