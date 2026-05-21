import anecdoteService from './services/anecdotes'
import { create } from 'zustand'

const useAnecdoteStore = create(set => ({
  anecdotes: [],
  filter: '',
  actions: {
     initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    addVotes: id => set(state => {
      const anecdote = state.anecdotes.find(a => a.id === id)
      const newValue = {...anecdote, votes: anecdote.votes + 1}
      const newAnecdotes = state.anecdotes.map(a => a.id !== id ?a :newValue)
      return {anecdotes: newAnecdotes} 
    }),
    addAnecdote: async content => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({anecdotes: state.anecdotes.concat(newAnecdote)}))
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