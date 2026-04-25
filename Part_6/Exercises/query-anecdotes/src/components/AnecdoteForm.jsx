import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useContext } from 'react'
import NotifiContext from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const {notifiDispatch} = useContext(NotifiContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      notifiDispatch({
        type: 'notifi',
        payload: `anecdote ${data.content} created`
      })
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      setTimeout(()=>{
        notifiDispatch({ type: ''})
      }, 3000)
    },
    onError: (error) => {
      notifiDispatch({ 
        type: 'error', 
        payload: error.message 
      })
      setTimeout(()=>{
        notifiDispatch({ type: ''})
      }, 3000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()    
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm