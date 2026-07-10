const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likedBLog } = require('./helpers')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    page.on('console', (msg) => {
      console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`)
    })
    await page.goto('/')
  })

  test('page is shown', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Blogs' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('link', { name: /Login/i }).click()

    await expect(page).toHaveURL('http://127.0.0.1:5173/login')
    await expect(
      page.getByRole('heading', { name: 'log in to application' }),
    ).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Testing login', () => {
    beforeEach(async ({ page, request }) => {
      const OldBlog = page
        .getByTestId('blog-list')
        .getByText('a blog created by playwright')
      const response = await request.post('/api/testing/reset')
      expect(response.ok()).toBeTruthy()
      await page.context().clearCookies()
      await page.evaluate(() => window.localStorage.clear())

      await page.reload()
      await expect(OldBlog).not.toBeVisible()
      const userResponse = await request.post('/api/users', {
        data: {
          name: 'test',
          username: 'test',
          password: 'test',
        },
      })
      expect(userResponse.ok()).toBeTruthy()
    })

    test('You can log in successfully', async ({ page }) => {
      await loginWith(page, 'test', 'test')

      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
      await expect(page.getByRole('link', { name: /new blog/i })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'error')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'test', 'test')
        await createBlog(
          page,
          'a blog created by playwright',
          'Author name',
          'www/playwright.com',
        )
      })

      test('a new blog can be created', async ({ page }) => {
        await expect(
          page.getByText('a new blog a blog created by playwright'),
        ).toBeVisible()
        await expect(
          page
            .getByTestId('blog-list')
            .getByText('a blog created by playwright'),
        ).toBeVisible()
      })

      test('The new blog can be voted for.', async ({ page }) => {
        await likedBLog(page, 'a blog created by playwright', '1')
        await expect(
          page.getByText(
            `a vote for a blog created by playwright by Author name added`,
          ),
        ).toBeVisible()
      })

      test('a new blog can be removed', async ({ page }) => {
        await page
          .getByRole('link', { name: 'a blog created by playwright' })
          .click()

        await Promise.all([
          page.waitForEvent('dialog').then((dialog) => dialog.accept()),
          page.getByRole('button', { name: 'Remove' }).click(),
        ])

        await expect(
          page.getByText(
            'the blog a blog created by playwright by Author name has been successfully deleted',
          ),
        ).toBeVisible()
        await expect(
          page
            .getByTestId('blog-list')
            .getByText('a blog created by playwright'),
        ).not.toBeVisible()
      })

      test('Only the creator can see the remove button', async ({
        page,
        request,
      }) => {
        await expect(
          page.getByRole('link', { name: 'a blog created by playwright' }),
        ).toBeVisible()
        await page.getByRole('button', { name: 'logout' }).click()
        await request.post('/api/users', {
          data: {
            name: 'test2',
            username: 'test2',
            password: 'test2',
          },
        })
        await loginWith(page, 'test2', 'test2')
        await page
          .getByRole('link', { name: 'a blog created by playwright' })
          .click()
        await expect(
          page.getByRole('button', { name: 'Remove' }),
        ).not.toBeVisible()
      })

      test('Blogs are ordered according to the number of likes', async ({
        page,
      }) => {
        await expect(
          page.getByRole('link', { name: 'a blog created by playwright' }),
        ).toBeVisible()

        await createBlog(
          page,
          'one blog more',
          'Author name',
          'www/playwright.com',
        )
        await expect(
          page.getByRole('link', { name: 'one blog more' }),
        ).toBeVisible()
        const blog = page.getByRole('link', { name: 'one blog more' })

        await createBlog(
          page,
          'and more blog',
          'Author name',
          'www/playwright.com',
        )
        await expect(
          page.getByRole('link', { name: 'and more blog' }),
        ).toBeVisible()
        const blog2 = page.getByRole('link', { name: 'and more blog' })

        await likedBLog(page, 'one blog more', 1)

        await likedBLog(page, 'and more blog', '1')
        await likedBLog(page, 'and more blog', '2')
        await likedBLog(page, 'and more blog', '3')

        await expect(
          page.getByTestId('blog-list').locator('div').first(),
        ).toContainText('and more blog')
      })
    })
  })
})
