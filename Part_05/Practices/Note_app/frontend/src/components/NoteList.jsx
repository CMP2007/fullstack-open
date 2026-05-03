import { useState } from 'react'
import Notification from './Notification'
import { Link } from 'react-router-dom'

const NoteList = ({notes}) => {
  
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  
  return(
    <>
      <h1>Notes</h1>
      {/* <Notification message={errorMessage} /> */}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note =>
           <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        )}
      </ul>
    </>
  )
}

export default NoteList