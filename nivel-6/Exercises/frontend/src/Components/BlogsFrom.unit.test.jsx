import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogsForm from './BlogsForm'

describe('testing of the form for creating new blogs', () => {
  test('The form correctly calls the event handler that is passed to it.', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

      render (<BlogsForm handlBlog={createBlog}/>)

      const inputTitle = screen.getByPlaceholderText('Enter the title here')
      const inputAuthor = screen.getByPlaceholderText('Enter the author here')
      const inputUrl = screen.getByPlaceholderText('Enter the URL here')
      const button = screen.getByRole('button', {name: /create/i})

      await user.type(inputTitle, 'Prueba Testing')
      await user.type(inputAuthor, 'new UserTest')
      await user.type(inputUrl, 'www./Prueba_Testing.com')
      await user.click(button)
      console.log(createBlog.mock.calls);
      

      expect(createBlog.mock.calls).toHaveLength(1)
      expect(createBlog.mock.calls[0][0].title).toBe('Prueba Testing')
      expect(createBlog.mock.calls[0][0].author).toBe('new UserTest')
      expect(createBlog.mock.calls[0][0].url).toBe('www./Prueba_Testing.com')
    })
})