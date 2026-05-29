import { useCounterButtons } from '../store'

const Buttons = () => {
  const actions = useCounterButtons()
  
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={actions.incrementGood}>good</button>
      <button onClick={actions.incrementNeutral}>neutral</button>
      <button onClick={actions.incrementBad}>bad</button>
    </div>
  )
}

export default Buttons
