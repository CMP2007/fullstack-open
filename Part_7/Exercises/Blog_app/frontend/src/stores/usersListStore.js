import { create } from 'zustand'
import userService from '../services/users'

const useUsersListStore = create((set) => ({
  usersList: null,
  actions: {
    getUsersList: async () => {
      const response = await userService.getAll()
      set((state) => ({ ...state, usersList: response }))
    },
  },
}))

export const useUsersList = () => useUsersListStore((state) => state.usersList)
export const useUsersListActions = () =>
  useUsersListStore((state) => state.actions)
