import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/FormAnecdotes'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

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