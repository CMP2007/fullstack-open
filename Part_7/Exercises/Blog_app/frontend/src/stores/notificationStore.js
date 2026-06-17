import { create } from 'zustand'

const useNotificationStore = create((set, get) => ({
  notification: { text: null, type: null },
  showNotification: (text, type) => set({ notification: { text, type } }),
  timeNotification: (text, type) => {
    const { showNotification } = get()
    showNotification(text, type)
    setTimeout(() => {
      showNotification(null, null)
    }, 5000)
  },
}))

export const useTextNotification = () =>
  useNotificationStore((state) => state.notification)
export const useTimeNotification = () =>
  useNotificationStore((state) => state.timeNotification)

export default useNotificationStore
