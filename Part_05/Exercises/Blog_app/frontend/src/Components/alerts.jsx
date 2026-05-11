import { Alert } from '@mui/material'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <Alert sx={{ marginTop: 2, marginBottom: 2 }} severity={notification.type}>
      {notification.text}
    </Alert>
  )
}

export default Notification