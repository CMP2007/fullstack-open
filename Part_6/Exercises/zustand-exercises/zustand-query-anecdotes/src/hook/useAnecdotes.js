import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../requests'

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

  console.log(JSON.parse(JSON.stringify(result)))
 
  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    error: result.error,
    addAnecdote: content => content.length < 5 
    ? console.error('The anecdote must be at least 5 characters long') 
    :newAnecdoteMutation.mutate({ content, votes: 0 })
  }
}