import { create } from 'zustand'
import Comments from '../services/comments'
import useNotificationStore from './notificationStore'
import comments from '../services/comments'

const useCommentsStore = create((set, get) => ({
  comments: null,
  actions: {
    getComments: async (id) => {
      const response = await Comments.getCommentsBlog(id)
      set((state) => ({ ...state, comments: response }))
    },
    addComment: async (newComment) => {
      try {
        const response = await Comments.addComment(newComment)
        set((state) => ({ comments: state.comments.concat(response) }))
        useNotificationStore
          .getState()
          .timeNotification(`a new comment ${response.comment}`, 'success')
      } catch (exception) {
        console.error('Error detallado:', exception)
        useNotificationStore
          .getState()
          .timeNotification(
            `Error registering the comment ${newComment.comment}`,
            'error',
          )
      }
    },
  },
}))

export const useComments = () => useCommentsStore((state) => state.comments)
export const useCommentsActions = () =>
  useCommentsStore((state) => state.actions)
