import { create } from "zustand";

export const useNotificationStore = create(set => ({
  message: null,
  actions: {    
    changeAlert: message => {
      set(()=> ({message}))

      setTimeout(() => {
        set(() => ({ message: null }))
      }, 5000)
    }
  }
}))

export const useNotification = () =>  useNotificationStore((state) => state.message)