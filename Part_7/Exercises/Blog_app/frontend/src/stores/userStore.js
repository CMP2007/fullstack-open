import { create } from 'zustand'
import LoginService from '../services/login'
import useNotificationStore from './notificationStore'
import userServices from '../services/persistentUser'

const useUserStore = create((set) => ({
  user: null,
  actions: {
    initializeUser: () => {
      const loggedUser = userServices.getUser()
      if (loggedUser) {
        set((state) => ({ ...state, user: loggedUser }))
      }
    },
    login: async (password, username) => {
      try {
        const response = await LoginService.login({ password, username })
        userServices.saveUser(response)
        set((state) => ({ ...state, user: response }))
      } catch {
        useNotificationStore
          .getState()
          .timeNotification('wrong username or password', 'error')
      }
    },
    closeSession: () => {
      userServices.removeUser()
      set((state) => ({ ...state, user: null }))
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
