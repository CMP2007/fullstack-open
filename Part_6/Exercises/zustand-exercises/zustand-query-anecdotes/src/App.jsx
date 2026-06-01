import { useAnecdotes } from './hook/useAnecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const {anecdotes, isPending, isError, error, voteAnecdote} = useAnecdotes()

  const handleVote = anecdote => {    
    voteAnecdote(anecdote)
  }

   if (isPending) { return <div>loading data...</div>}

   if (isError) {
    console.log(error.message);
    return <span>anecdote service not available due to problems in server </span>
  }

  if (!anecdotes) return null;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App