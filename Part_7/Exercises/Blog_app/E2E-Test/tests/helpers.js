const loginWith = async (page, username, password) => {
  await page.getByRole('link', { name: /Login/i }).click()
  await page.getByText('username').fill(username)
  await page.getByText('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('link', { name: /new blog/i }).click()
  await page.getByLabel('Title').fill(title)
  await page.getByLabel('Author').fill(author)
  await page.getByLabel('Url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

module.exports = {loginWith, createBlog}