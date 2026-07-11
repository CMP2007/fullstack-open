const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
  await page.getByRole('link', { name: /Login/i }).click()
  await page.getByText('username').fill(username)
  await page.getByText('password').fill(password)
  await page.getByRole('button', { name: 'login', exact: true }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('link', { name: /new blog/i }).click()
  await page.getByLabel('Title').fill(title)
  await page.getByLabel('Author').fill(author)
  await page.getByLabel('Url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()

  await page.getByText(title).first().waitFor({ state: 'visible' })
}

const likedBLog = async (page, title, numberLikes) => {
  await page.getByRole('link', { name: title }).click({ force: true })
  await page.waitForURL(/\/blogs\//)
  await page.getByRole('button', { name: 'like' }).click()

  await expect(page.getByTestId('likes-count')).toHaveText(
    `${numberLikes} likes`,
  )
  await page.goBack()
}

module.exports = { loginWith, createBlog, likedBLog }
