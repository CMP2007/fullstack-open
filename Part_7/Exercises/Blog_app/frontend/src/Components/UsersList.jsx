import { useUsersListActions, useUsersList } from '../stores/usersListStore'
import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link as MuiLink,
} from '@mui/material'

const UsersList = () => {
  const { getUsersList } = useUsersListActions()
  const usersList = useUsersList()

  useEffect(() => {
    getUsersList()
  }, [])

  if (usersList === null) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <MuiLink
                    component={RouterLink}
                    to={`/users/${user.id}`}
                    underline="none"
                    color="primary"
                  >
                    {user.name}
                  </MuiLink>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersList
