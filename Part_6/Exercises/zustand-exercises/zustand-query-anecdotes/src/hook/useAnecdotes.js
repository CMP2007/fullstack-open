import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote} from '../requests'

export const useAnecdotes = () =>{
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id !== updatedAnecdote.id ?a :updatedAnecdote))
    }
  })
 
  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    error: result.error,
    addAnecdote: content => content.length < 5 
      ? console.error('The anecdote must be at least 5 characters long') 
      :newAnecdoteMutation.mutate({ content, votes: 0 }),
    voteAnecdote: updatedAnecdote => {  
      updateAnecdoteMutation.mutate({...updatedAnecdote, votes: updatedAnecdote.votes +1 })
    }
  }
}