import { create } from 'zustand'
import Blogs from '../services/blogs'
import useNotificationStore from './notificationStore'

const useBlogStore = create((set, get) => ({
  blogs: [],
  actions: {
    initialize: async () => {
      const response = await Blogs.getAll()
      set((state) => ({ ...state, blogs: response }))
    },
    addBLog: async (blog, user) => {
      try {
        const response = await Blogs.CreateBlogs(blog, user.token)
        set((state) => ({ blogs: state.blogs.concat(response) }))
        useNotificationStore
          .getState()
          .timeNotification(
            `a new blog ${response.title} by ${response.author} added`,
            'success',
          )
      } catch (exception) {
        console.error('Error detallado:', exception)
        useNotificationStore
          .getState()
          .timeNotification(
            `Error registering the blog ${blog.title} by ${blog.author}`,
            'error',
          )
      }
    },
    changeBlog: async (blog) => {
      const userData = blog.user
      const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      try {
        const response = await Blogs.changeBlogs(newBlog)
        const userAndBlog = { ...response, user: userData }
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog.id !== newBlog.id ? blog : userAndBlog,
          ),
        }))
        useNotificationStore
          .getState()
          .timeNotification(
            `a vote for ${response.title} by ${response.author} added`,
            'success',
          )
      } catch (exception) {
        console.error('Error detallado:', exception)
        useNotificationStore
          .getState()
          .timeNotification(
            `Error registering the vote ${newBlog.title} by ${newBlog.author}`,
            'error',
          )
      }
    },
    deleteBlog: async (id, user) => {
      const blog = get().blogs.find((blog) => blog.id === id)
      try {
        await Blogs.deletedBlogs(id, user.token)
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== id),
        }))
        useNotificationStore
          .getState()
          .timeNotification(
            `the blog ${blog.title} by ${blog.author} has been successfully deleted`,
            'success',
          )
      } catch (exception) {
        console.error('Error detallado:', exception)
        useNotificationStore
          .getState()
          .timeNotification(
            `Error deleting the blog ${blog.title} by ${blog.author}`,
            'error',
          )
      }
    },
  },
}))

export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useBlogsActions = () => useBlogStore((state) => state.actions)
