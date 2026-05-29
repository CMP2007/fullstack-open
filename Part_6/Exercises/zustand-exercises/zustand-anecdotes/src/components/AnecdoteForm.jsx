import {  useAnecdoteActions } from '../anecdotesStore'

const AnecdoteForm = () => {
  const { addAnecdote} = useAnecdoteActions()

  const sendAnecdotes = (e) => {
     e.preventDefault()
     const content = e.target.anecdote.value
     addAnecdote(content)
     e.target.reset()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={sendAnecdotes}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm