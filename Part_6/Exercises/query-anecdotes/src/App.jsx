import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './request'

import { useContext } from 'react'
import NotifiContext from './notificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const {notifiDispatch} = useContext(NotifiContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (data) => {
      notifiDispatch({
        type: 'notifi',
        payload: `anecdote ${data.content} voted`
      })
      queryClient.invalidateQueries({queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    setTimeout(()=>{
      notifiDispatch({ type: 'notifi', payload: ``})
    }, 3000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    console.log(result.error);
    return (
      <div>
        <p>anecdote service is not avilable due to problems in server</p>
        <p>{result.error.message}</p>
      </div>
    )
  }
  
  const anecdotes = result.data.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App