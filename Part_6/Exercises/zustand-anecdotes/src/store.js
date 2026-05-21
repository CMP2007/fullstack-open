import anecdoteService from './services/anecdotes'
import { create } from 'zustand'

const useAnecdoteStore = create(set => ({
  anecdotes: [],
  filter: '',
  actions: {
     initialize: async () => {
      try {
        const anecdotes = await anecdoteService.getAll()
        set(() => ({ anecdotes }))
      } catch (error) {
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
      } catch (error) {
        console.error("Error updating votes:", error)
      }
    },
    addAnecdote: async content => {
      try {
        const newAnecdote = await anecdoteService.createNew(content)
        set(state => ({anecdotes: state.anecdotes.concat(newAnecdote)}))
      } catch (error) {
        console.error("error created the anecdotes:", error)
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