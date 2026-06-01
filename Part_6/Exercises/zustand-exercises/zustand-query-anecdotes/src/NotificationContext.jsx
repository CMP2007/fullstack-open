/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext


export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)

   const showNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
   }

  return (
    <NotificationContext.Provider value={{notification, showNotification}}>
      {props.children}
    </NotificationContext.Provider>
  )
}


export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context.notification
}

export const useNotify = () => {
  const context = useContext(NotificationContext)
  return context.showNotification
}