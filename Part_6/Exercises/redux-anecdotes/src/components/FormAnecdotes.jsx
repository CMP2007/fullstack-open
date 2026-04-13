import { createAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    dispatch(createAnecdote(content))
    dispatch(notification('Create anecdote'))
    setTimeout(() => {
      dispatch(notification(''))
    }, 5000)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdoteInput' />
        </div>
        <button type='submit' >create</button>
      </form>
    </>
  )
}

export default AnecdoteForm