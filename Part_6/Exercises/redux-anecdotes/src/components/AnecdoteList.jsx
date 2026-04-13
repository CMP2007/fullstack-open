import { useSelector, useDispatch } from 'react-redux'
import { addVote } from "../reducers/anecdoteReducer"
import { notification, clearNotification } from '../reducers/notificationReducer'

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

  const vote = id => {
    dispatch(addVote(id))
    dispatch(notification('voted added'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

  return ( 
    <>
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList