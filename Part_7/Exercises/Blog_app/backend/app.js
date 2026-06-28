const config = require('./utils/config')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.getToken)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/blogs/:id/comments', commentsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'))
  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
