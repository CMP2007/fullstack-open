import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    dispatch(createNewAnecdote(content))
    dispatch(setNotification(`Create anecdote '${content}'`, 5))
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