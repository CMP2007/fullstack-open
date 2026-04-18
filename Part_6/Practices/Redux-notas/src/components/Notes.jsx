import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notes'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {

  const dispatch = useDispatch()
  const notes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.notes
    }
    return state.filter === 'IMPORTANT'
    ? state.notes.filter(note=>note.important)
    : state.notes.filter(note=>!note.important)
  })

   const sendData = async (note) => {
      try {
        const newValor = await noteService.toggleImportance(note.id, !note.important)
            dispatch(toggleImportanceOf(newValor))
      } catch (exception) {
        console.log('Error al cambiar la importancia:', exception)
      }
    }

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => sendData(note)}
        />
      )}
    </ul>
  )
}

export default Notes