import { useSelector, useDispatch } from 'react-redux'
import { addedVote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(({ filter, anecdotes }) => {      
    if ( filter ) {
      return anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
    }
    return anecdotes
  })

  const dispatch = useDispatch()

  const vote = (vote, id, content) => {
    dispatch(addedVote(vote, id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return ( 
    <>
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.votes, anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList