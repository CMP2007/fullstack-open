import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote} from '../requests'
import useNotification from './useNotification'

export const useAnecdotes = () =>{
  const queryClient = useQueryClient()
  const {showNotification} = useNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {    
      showNotification(`anecdote ${newAnecdote.content} created correctly`)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: error => {
      showNotification(error.message)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      showNotification(`anecdote ${updatedAnecdote.content} voted`)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id !== updatedAnecdote.id ?a :updatedAnecdote))
    },
    onError: () => {
      showNotification(`Error processing the vote`)
    }
  })
 
  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    error: result.error,
    addAnecdote: content => newAnecdoteMutation.mutate({ content, votes: 0 }),
    voteAnecdote: updatedAnecdote => {  
      updateAnecdoteMutation.mutate({...updatedAnecdote, votes: updatedAnecdote.votes +1 })
    }
  }
}