import { useAnecdotes } from '../hook/useAnecdotes'
import useNotification from '../hook/useNotification'

const AnecdoteForm = () => {
  const {addAnecdote} = useAnecdotes()
  const {showNotification} = useNotification()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdote(content)
    showNotification(`anecdote ${content} created correctly`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" minLength="5"/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm