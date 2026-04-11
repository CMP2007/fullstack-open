import AnecdoteForm from './components/FormAnecdotes'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/filter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm />
    </div>
  )
}

export default App