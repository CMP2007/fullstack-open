import { create } from 'zustand'
import LoginService from '../services/login'
import useNotificationStore from './notificationStore'

const useUserStore = create((set) => ({
  user: null,
  actions: {
    initializeUser: () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        set((state) => ({ ...state, user: user }))
      }
    },
    login: async (password, username) => {
      console.log(password, username)
      try {
        const response = await LoginService.login({ password, username })
        console.log(response)
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(response))
        set((state) => ({ ...state, user: response }))
      } catch {
        useNotificationStore
          .getState()
          .timeNotification('wrong username or password', 'error')
      }
    },
    closeSession: () => {
      window.localStorage.removeItem('loggedBlogUser')
      set((state) => ({ ...state, user: null }))
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
