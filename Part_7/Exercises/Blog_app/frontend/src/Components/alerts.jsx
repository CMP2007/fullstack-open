import { Alert } from '@mui/material'
import { useTextNotification } from '../stores/notificationStore'

const Notification = () => {
  const notification = useTextNotification()
  console.log(notification)

  if (notification.text === null) {
    return null
  }

  return (
    <Alert sx={{ marginTop: 2, marginBottom: 2 }} severity={notification.type}>
      {notification.text}
    </Alert>
  )
}

export default Notification
