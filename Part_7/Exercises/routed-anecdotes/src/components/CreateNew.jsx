import { useNavigate } from 'react-router-dom'
import  { useField, useAnecdotes } from '../hooks'

const CreateNew = () => {
  const navigate = useNavigate()
  const {reset: resetContent, ...inputContent} = useField('text')
  const {reset: resetAuthor, ...inputAuthor} = useField('text')
  const {reset: resetInfo, ...inputInfo} = useField('text')
  const { addAnecdote } = useAnecdotes()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ 
      content: inputContent.value, 
      author: inputAuthor.value, 
      info: inputInfo.value, votes: 0 
    })
    navigate('/')
  }

  const reseted = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...inputContent} /> 
        </div>
        <div>
          author
          <input {...inputAuthor} /> 
        </div>
        <div>
          url for more info
          <input {...inputInfo} /> 
        </div>
        <button>create</button>
        <button type='button' onClick={reseted}>Reset</button>
      </form>
    </div>
  )
}

export default CreateNew