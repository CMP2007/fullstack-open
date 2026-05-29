import { useAnecdotes, useAnecdoteActions} from '../anecdotesStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const {addVotes, deleteAnecdote} = useAnecdoteActions()

  const vote = anecdote => addVotes(anecdote)
  const deleted = anecdote => deleteAnecdote(anecdote)

  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            {anecdote.votes === 0 
              ?<button onClick={() => deleted(anecdote)}>delete</button>
              :null
            }
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList