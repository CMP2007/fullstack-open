import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const index = state.findIndex(a => a.id === action.payload.id)
      state[index] = action.payload      
      state.sort((a, b) => b.votes - a.votes) 
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  },
})

const { setAnecdotes, createAnecdote, addVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote);
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addedVote = (vote, id) => {
  return async (dispatch) => {
    const fechVotes = await anecdoteService.voteAnecdotes(vote, id)
    console.log(fechVotes);
    dispatch(addVote(fechVotes))
  }
}

export default anecdoteSlice.reducer