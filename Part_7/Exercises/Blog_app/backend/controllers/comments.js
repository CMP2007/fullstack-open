const commentsRouter = require('express').Router({ mergeParams: true })
const { request } = require('express')
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  const blogId = request.params.id
  const comments = await Comment.find({ blogId: blogId })
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const blogDefect = request.params.id
  const { comment: textContent } = request.body

  if (!textContent) {
    return response.status(400).json({ error: 'comments missing' })
  }

  const comment = new Comment({
    comment: textContent,
    blogId: blogDefect,
  })

  const savedcomment = await comment.save()
  response.status(201).json(savedcomment)
})

module.exports = commentsRouter
