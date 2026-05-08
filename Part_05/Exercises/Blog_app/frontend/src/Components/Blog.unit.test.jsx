import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import { beforeAll, beforeEach } from 'vitest'

const blogs = [{
  author: "Test",
  id: "69a6e6b432dc572630t5s892",
  likes: 0,
  title: "Testing blog",
  url: "test.com",
  user:{
    id: "6981751bd4e723e9863a1417",
    name:"user",
    username: "userApp"
  } 
}]

const renderBlogs = (userData) => {
  const blogId = blogs[0].id
  return (
    render(
      <MemoryRouter initialEntries={[`/blogs/${blogId}`]}>
        <Routes>
          <Route path='/blogs/:id' element={
            <Blog blogs={blogs} user={userData}/>
          }/>
        </Routes>
      </MemoryRouter>
    )
  )
}

describe('testing de la vista individual de los blogs', ()=>{
  test('los elementos correctos se muestran a los usuarios no autenticados', ()=>{

    renderBlogs(null)
    const title = screen.getByText(/Testing blog/)
    expect(title).toBeDefined()
    const author = screen.getByText(/Test/)
    expect(author).toBeDefined()

    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  test('el boton de like se muestra a los usuarios autenticados', ()=>{

    renderBlogs({id: "6981751bd4e723e9863c589"})
    const title = screen.getByText(/Testing blog/)
    expect(title).toBeDefined()
    const author = screen.getByText(/Test/)
    expect(author).toBeDefined()

    const likeButton = screen.getByRole('button', { name: /like/i })
    expect(likeButton).toBeDefined()

    const removeButton = screen.queryByRole('button', { name: /remove/i })
    expect(removeButton).toBeNull()
  })

  test('los botones like y remove se muestra al usuario creador del blog', ()=>{

    renderBlogs(blogs[0].user)
    const title = screen.getByText(/Testing blog/)
    expect(title).toBeDefined()
    const author = screen.getByText(/Test/)
    expect(author).toBeDefined()

    const likeButton = screen.getByRole('button', { name: /like/i })
    expect(likeButton).toBeDefined()

    const removeButton = screen.queryByRole('button', { name: /remove/i })
    expect(removeButton).toBeDefined()
  })
})