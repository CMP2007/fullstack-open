import { useComments, useCommentsActions } from '../stores/commentsStore'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Typography } from '@mui/material'

const Comments = () => {
  const comments = useComments()
  const { getComments } = useCommentsActions()
  const id = useParams().id

  useEffect(() => {
    getComments(id)
  }, [id, getComments])

  if (!comments) {
    return (
      <Typography variant="body2" color="text.secondary">
        Loading comments...
      </Typography>
    )
  }

  if (comments.length === 0) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginTop: 2, fontStyle: 'italic' }}
      >
        No comments yet. Be the first to add one!
      </Typography>
    )
  }

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
