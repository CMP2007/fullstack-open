import anecdoteService from './services/anecdotes'
import { create } from 'zustand'

import { useNotificationStore } from "./notificationStore"

const useAnecdoteStore = create(set => ({
  anecdotes: [],
  filter: '',
  actions: {
     initialize: async () => {
      try {
        const anecdotes = await anecdoteService.getAll()
        set(() => ({ anecdotes }))
      } 
      catch (error) {
        console.error("error initializing the anecdotes:", error)
      }
    },
    addVotes: async anecdote => {
      const anecdoteUpdate = {...anecdote, votes: anecdote.votes + 1}
      try {
        const response = await anecdoteService.update(anecdoteUpdate)
        set(state => {
          const newAnecdote = state.anecdotes.map(a => a.id !== anecdote.id ?a :response)
          return {anecdotes: newAnecdote} 
        })
        useNotificationStore.getState().actions.changeAlert(`You voted '${anecdote.content}'`)
      } 
      catch (error) {
        console.error("Error updating votes:", error)
        useNotificationStore.getState().actions.changeAlert(`Your vote could not be processed`)
      }
    },
    addAnecdote: async content => {
      try {
        const newAnecdote = await anecdoteService.createNew(content)
        set(state => ({anecdotes: state.anecdotes.concat(newAnecdote)}))
        useNotificationStore.getState().actions.changeAlert( `Your anecdote '${content}' was created correctly`)
      } 
      catch (error) {
        console.error("error created the anecdotes:", error)
        useNotificationStore.getState().actions.changeAlert( `The anecdote could not be processed.`)
      }
    },
    deleteAnecdote: async anecdote => {
      try {
        await anecdoteService.deleted(anecdote)       
        set(state => {
          const newList = state.anecdotes.filter(a => a.id !== anecdote.id)
          return {anecdotes: newList} 
        })
        useNotificationStore.getState().actions.changeAlert(`Deleted anecdote'${anecdote.content}'`)
      } 
      catch (error) {
        console.error("Error updating votes:", error)
        useNotificationStore.getState().actions.changeAlert(`The anecdote could not be deleted`)
      }
    },
    setFilter : value => set(() => ({filter: value}))
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  
  return anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())  
  ) 
}

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)