import { useComments, useCommentsActions } from '../stores/commentsStore'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Comments = () => {
  const comments = useComments()
  const { getComments } = useCommentsActions()

  const id = useParams().id

  useEffect(() => {
    getComments(id)
  }, [id, getComments])

  if (!comments) {
    return <p>Loading comments...</p>
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
