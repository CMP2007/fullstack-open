const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helpers')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  describe('Testing login', () => {
    beforeEach(async ({page, request}) => {
      await request.post('/api/testing/reset')
      await request.post('/api/users', {
        data: {
          name: 'test',
          username: 'test',
          password: 'test'
        }
      })
    })
    
    test('You can log in successfully', async ({page}) => {
      await loginWith(page, 'test', 'test') 

      await expect(page.getByText('test logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'error')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('test logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
          await loginWith(page, 'test', 'test')
          await createBlog(page, 'a blog created by playwright', 'Author name', 'www/playwright.com')
      })

      test('a new blog can be created', async ({ page }) => {
        const alertDiv = await page.locator('.alert')
        await expect(alertDiv).toContainText('a new blog a blog created by playwright')
        await expect(alertDiv).toHaveCSS('border-style', 'solid')
        await expect(alertDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
        
        await expect(page.getByTestId('blog-list').getByText('a blog created by playwright')).toBeVisible()
      })

      test('a new blog can be added', async ({ page }) => {  
        const blog = page.getByTestId('blog-list').getByText('a blog created by playwright')
        await blog.getByRole('button', { name: 'view' }).click()
        await blog.getByRole('button', { name: 'like' }).click()

        const alertDiv = await page.locator('.alert')
        await expect(alertDiv).toContainText('a vote for a blog created by playwright by Author name added')
        await expect(alertDiv).toHaveCSS('border-style', 'solid')
        await expect(alertDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

        await expect(blog.getByText(1)).toBeVisible()
      })

      test('a new blog can be removed', async ({page}) => {
        const blog = page.getByTestId('blog-list').getByText('a blog created by playwright')
        await blog.getByRole('button', { name: 'view' }).click()
        
        await Promise.all([
          page.waitForEvent('dialog').then(dialog => dialog.accept()),
          blog.getByRole('button', { name: 'Remove' }).click()
        ])

        const alertDiv = await page.locator('.alert')
        await expect(alertDiv).toContainText('the blog a blog created by playwright by Author name has been successfully deleted')
        await expect(alertDiv).toHaveCSS('border-style', 'solid')
        await expect(alertDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

        await expect(page.getByTestId('blog-list').getByText('a blog created by playwright')).not.toBeVisible()
      })

      test('Only the creator can see the rmove button', async ({page, request}) => {
        await expect(page.getByTestId('blog-list').getByText('a blog created by playwright')).toBeVisible()
        await page.getByRole('button', { name: 'logout' }).click()
        await request.post('/api/users', {
          data: {
            name: 'test2',
            username: 'test2',
            password: 'test2'
          }
        })
        await loginWith(page, 'test2', 'test2')
        const blog = page.getByTestId('blog-list').getByText('a blog created by playwright')
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'Remove' })).not.toBeVisible()
      })

      test('Blogs are ordered according to the number of likes', async({page}) => {
        await expect(page.getByTestId('blog-list').getByText('a blog created by playwright')).toBeVisible()

        await createBlog(page, 'one blog more', 'Author name', 'www/playwright.com')
        await expect(page.getByTestId('blog-list').getByText('one blog more')).toBeVisible()
        const blog = page.getByTestId('blog-list').getByText('one blog more')

        await createBlog(page, 'and more blog', 'Author name', 'www/playwright.com')
        await expect(page.getByTestId('blog-list').getByText('and more blog')).toBeVisible()

        await blog.getByRole('button', { name: 'view' }).click()
        await blog.getByRole('button', { name: 'like' }).click()
        await expect(blog.locator('.likes-count')).toHaveText('1')

        const blog2 = page.getByTestId('blog-list').getByText('and more blog')
        await blog2.getByRole('button', { name: 'view' }).click()
        await blog2.getByRole('button', { name: 'like' }).click()
        await expect(blog2.locator('.likes-count')).toHaveText('1')
        await blog2.getByRole('button', { name: 'like' }).click()
        await expect(blog2.locator('.likes-count')).toHaveText('2')
        await blog2.getByRole('button', { name: 'like' }).click()
        await expect(blog2.locator('.likes-count')).toHaveText('3')

        await expect(page.getByTestId('blog-item').first()).toContainText('and more blog')

        const likesLocators = page.locator('.likes-count')
        
        const likesTexts = await likesLocators.allTextContents()
        const likesNumbers = likesTexts.map(text => parseInt(text))

        const sortedLikes = [...likesNumbers].sort((a, b) => b - a)

        expect(likesNumbers).toEqual(sortedLikes)
        
      })
    })
  })
})
