import { createAnecdote } from '../reducers/anecdoteReducer'
import { notification, clearNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import noteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    const newAnecdote = await noteService.createNew(content)
    console.log(newAnecdote);
    
    dispatch(createAnecdote(newAnecdote))
    dispatch(notification('Create anecdote'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
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