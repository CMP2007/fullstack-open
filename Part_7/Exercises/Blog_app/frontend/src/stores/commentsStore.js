import { create } from 'zustand'
import Comments from '../services/comments'
import useNotificationStore from './notificationStore'

const useCommentsStore = create((set, get) => ({
  comments: null,
  actions: {
    getComments: async (id) => {
      const response = await Comments.getCommentsBlog(id)
      set((state) => ({ ...state, comments: response }))
    },
  },
}))

export const useComments = () => useCommentsStore((state) => state.comments)
export const useCommentsActions = () =>
  useCommentsStore((state) => state.actions)
