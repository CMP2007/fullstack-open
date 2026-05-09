import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'


// Forma 1 como ubicar y acceder a elemtos usando el expect y el metodo getBtText
test('renders content metodo 1', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  
  render(
    <Router>
      <Note note={note} />
    </Router>
  )

  const element = screen.getByText('Component testing is done with react-testing-library')

    screen.debug(element)

  expect(element).toBeDefined()

//Tambien se puede usar el metodo "getByTestId" para encontrar el elemtos usando  sus atributos
//Ejemplo
// render(<MyComponent />)
// const element = screen.getByTestId('custom-element')
})


// Forma 2 usar el objeto Container para ubicar el elemto por su querySelector (css)

test('renders content metodo 2', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const { container } = render(<Router><Note note={note} /></Router>)

  const div = container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})



test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn()

  render(
    <Router>
      <Note note={note} cambiarImportancia={mockHandler} />
    </Router>
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  }

  render(
    <Router>
      <Note note={note} />
    </Router>
  )

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})