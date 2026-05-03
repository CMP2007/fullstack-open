// import { useState, useEffect, useRef } from 'react'
// import Note from './components/Note'
// import noteService from './services/notes'
// import Notification from './components/Notification'
// import Footer from './components/Footer'
// import NoteForm from './components/NoteForm'
// import LoginForm from './components/LoginForm'
// import loginService from './services/login'
// import Togglable from './components/Togglable'
// import NoteList from './components/NoteList'
// import './App.css'


// const App = () => {

//   const [notes, setNotes] = useState([])
//   const [showAll, setShowAll] = useState(true)
//   const [errorMessage, setErrorMessage] = useState(null)
//   const [user, setUser] = useState(null)

//   const noteFormRef = useRef()

//   useEffect(() => {
//     noteService
//       .getAll()
//       .then(initialNotes => {
//         setNotes(initialNotes)
//       })
//   },[])

//   useEffect(() => {
//     const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       setUser(user)
//       noteService.setToken(user.token)
//     }
//   }, [])

//   const handleLogin = async (username, password) => {
//     try {
//       const user = await loginService.login({ username, password })

//       window.localStorage.setItem(
//         'loggedNoteappUser', JSON.stringify(user)
//       )
//       noteService.setToken(user.token)
//       setUser(user)
//     } catch {
//       setErrorMessage('Wrong credentials')
//       setTimeout(() => {
//         setErrorMessage(null)
//       }, 5000)
//     }
//   }

  // const toggleImportanceOf = (id) => {
  //   const note = notes.find(n => n.id === id)
  //   const changedNote = { ...note, important: !note.important }

  //   noteService
  //     .update(id, changedNote)
  //     .then(returnedNote => {
  //       setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  //     })
  //     .catch(() => {
  //       setErrorMessage(
  //         `Note '${note.content}' was already removed from server`
  //       )
  //       setTimeout(() => {
  //         setErrorMessage(null)
  //       }, 5000)
  //     })}

//   const addNote = (noteObject) => {
//     noteFormRef.current.toggleVisibility()
//     noteService
//       .create(noteObject)
//       .then(returnedNote => {
//         setNotes(notes.concat(returnedNote))
//       })
//       .catch(error => {
//         setErrorMessage( error.response.data.error)
//         setTimeout(() => {
//           setErrorMessage(null)
//         }, 5000)
//       })
//   }

//   return (
//     <div>
//       <h1>Notes</h1>
//       <Notification message={errorMessage} />
//       {user === null ?
//         <Togglable buttonLabel='login'>
//           <LoginForm handleLogin= {handleLogin} />
//         </Togglable>
//         :
//         <div>
//           <p>{user.name} <b>logged-in</b></p>
//           <Togglable buttonLabel='new note' ref={noteFormRef}>
//             <NoteForm createNote={addNote} />
//           </Togglable>
//         </div>
//       }
//       <NoteList notes={notesToShow}/>
//       <Footer/>
//     </div>
//   )
// }

//---------------------------------------------------------------------------------

import { useState, useEffect } from 'react'
import noteService from './services/notes'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import NoteList from './components/NoteList'
import Home from './components/Home'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const addNote = noteObject => {
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })}

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/create">new note</Link>
      </div>


      <Routes>
        <Route path="/notes/:id" element={
          <Note note={note} toggleImportanceOf={toggleImportanceOf} deleteNote = {deleteNote} />
        } />
        <Route path="/notes" element={
          <NoteList notes={notes} />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote}/>
        } />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App