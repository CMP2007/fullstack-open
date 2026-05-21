import { useAnecdotes, useAnecdoteActions} from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const {addVotes} = useAnecdoteActions()

    const vote = anecdote => {
    addVotes(anecdote)
  }

  const orderedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <>
      {orderedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList