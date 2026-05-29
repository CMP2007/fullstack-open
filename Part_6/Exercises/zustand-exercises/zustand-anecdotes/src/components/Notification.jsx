import { useNotification } from "../notificationStore"

const Notification = () => {
  const notification = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (notification) {
    return <div style={style}>{notification}</div>
  }

  return null
}

export default Notification