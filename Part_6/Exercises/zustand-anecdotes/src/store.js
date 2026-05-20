import anecdoteService from './services/anecdotes'
import { create } from 'zustand'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

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
    addAnecdote: newAnecdote => set(state => {
      const objAnecdote = asObject(newAnecdote)
      return({anecdotes: state.anecdotes.concat(objAnecdote)})
    }),
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