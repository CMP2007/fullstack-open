import AnecdoteForm from './components/FormAnecdotes'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm />
    </div>
  )
}

export default App