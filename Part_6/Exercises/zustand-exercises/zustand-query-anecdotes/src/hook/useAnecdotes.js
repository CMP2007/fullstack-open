import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests'

export const useAnecdotes = () =>{

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))
 
  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    error: result.error
  }
}