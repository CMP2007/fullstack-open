import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogsForm from './BlogsForm'
import { BrowserRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'

const mockAddBlog = vi.fn()

vi.mock('../stores/blogStore', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useBlogsActions: () => ({
      addBLog: mockAddBlog,
    }),
  }
})

vi.mock('../stores/userStore', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useUser: () => ({ username: 'test_user', name: 'Carlos' }),
    useUserActions: () => ({}),
  }
})

describe('testing of the form for creating new blogs', () => {
  beforeEach(() => {
    mockAddBlog.mockClear()
  })

  test('The form correctly calls the event handler that is passed to it.', async () => {
    const user = userEvent.setup()

    render(
      <Router>
        <BlogsForm />
      </Router>,
    )

    const inputTitle = screen.getByLabelText(/Title/i)
    const inputAuthor = screen.getByLabelText(/Author/i)
    const inputUrl = screen.getByLabelText(/Url/i)
    const button = screen.getByRole('button', { name: /create/i })

    await user.type(inputTitle, 'Prueba Testing')
    await user.type(inputAuthor, 'new UserTest')
    await user.type(inputUrl, 'www./Prueba_Testing.com')
    await user.click(button)

    expect(mockAddBlog.mock.calls).toHaveLength(1)

    expect(mockAddBlog.mock.calls[0][0].title).toBe('Prueba Testing')
    expect(mockAddBlog.mock.calls[0][0].author).toBe('new UserTest')
    expect(mockAddBlog.mock.calls[0][0].url).toBe('www./Prueba_Testing.com')
  })
})
