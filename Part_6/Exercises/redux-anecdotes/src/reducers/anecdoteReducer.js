import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteVote = state.find(a => a.id === id) 
      
      if (anecdoteVote) {
        anecdoteVote.votes += 1
      }
      state.sort((a, b) => b.votes - a.votes) 
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  },
})

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer