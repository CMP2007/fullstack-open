import { createContext, useReducer } from 'react'

const notifiReducer = (state, action) => {
  switch (action.type) {
    case 'notifi':
      return action.payload
    case 'error':
      return action.payload
    default:
      return ''
  }
}

const NotifiContext = createContext()

export const NotifiContextProvider = (props) => {
  const [notification, notifiDispatch] = useReducer(notifiReducer, '')

  return (
    <NotifiContext.Provider value={{ notification, notifiDispatch }}>
      {props.children}
    </NotifiContext.Provider>
  )
}

export default NotifiContext