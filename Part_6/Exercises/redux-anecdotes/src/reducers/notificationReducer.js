import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState:  '',
  reducers: {
    notification(state, action) {
      return  action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  },
})

const { notification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async (dispatch) => {    
    dispatch(notification(message))
    console.log(time*1000);
    
    setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
  }
}

export default notificationSlice.reducer