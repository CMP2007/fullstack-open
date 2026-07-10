import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { vi, describe, test, expect, beforeEach } from 'vitest'

const blogs = [
  {
    author: 'Test',
    id: '69a6e6b432dc572630t5s892',
    likes: 0,
    title: 'Testing blog',
    url: 'test.com',
    user: {
      id: '6981751bd4e723e9863a1417',
      name: 'user',
      username: 'userApp',
    },
  },
]

let mockCurrentUser = null

vi.mock('../stores/blogStore', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useBlogs: () => blogs,
    useBlogsActions: () => ({
      likeBlog: vi.fn(),
      removeBlog: vi.fn(),
    }),
  }
})

vi.mock('../stores/userStore', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useUser: () => mockCurrentUser,
  }
})

vi.mock('./CommentsForm', () => ({
  default: () => <div data-testid="mock-comments-form" />,
}))

vi.mock('./CommentsList', () => ({
  default: () => <div data-testid="mock-comments-list" />,
}))

const renderBlogs = (userData) => {
  mockCurrentUser = userData
  const blogId = blogs[0].id
  return render(
    <MemoryRouter initialEntries={[`/blogs/${blogId}`]}>
      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('testing de la vista individual de los blogs', () => {
  beforeEach(() => {
    mockCurrentUser = null
  })

  test('los elementos correctos se muestran a los usuarios no autenticados', () => {
    renderBlogs(null)

    const title = screen.getByText(/Testing blog/)
    expect(title).toBeDefined()
    const author = screen.getByText(/Added by: "userApp"/i)
    expect(author).toBeDefined()

    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  test('el boton de like se muestra a los usuarios autenticados', () => {
    renderBlogs({ id: '6981751bd4e723e9863c589' })
    const title = screen.getByText(/Testing blog/)
    expect(title).toBeDefined()
    const author = screen.getByText(/Added by: "userApp"/i)
    expect(author).toBeDefined()

    const likeButton = screen.getByRole('button', { name: /like/i })
    expect(likeButton).toBeDefined()

    const removeButton = screen.queryByRole('button', { name: /remove/i })
    expect(removeButton).toBeNull()
  })

  test('los botones like y remove se muestra al usuario creador del blog', () => {
    renderBlogs(blogs[0].user)
    const title = screen.getByText(/Testing blog/i)
    expect(title).toBeDefined()
    const author = screen.getByText(/Added by: "userApp"/i)
    expect(author).toBeDefined()

    const likeButton = screen.getByRole('button', { name: /like/i })
    expect(likeButton).toBeDefined()

    const removeButton = screen.queryByRole('button', { name: /remove/i })
    expect(removeButton).toBeDefined()
  })
})
