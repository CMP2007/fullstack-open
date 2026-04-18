import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload.id
      return state.map(note =>
        note.id !== id ? note : action.payload 
      )     
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})

const { createNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const appendNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }
}

export const { toggleImportanceOf } = noteSlice.actions

export default noteSlice.reducer