import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote =  async(anecdote) => {
    try{
      const data = await anecdoteService.createNew(anecdote)
      setAnecdotes(anecdotes.concat(data))
    }
    catch (error){
      console.error("Error capturado:", error.message)
    }
  }

  return {anecdotes, addAnecdote}
}