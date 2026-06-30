import { useCommentsActions } from '../stores/commentsStore'
import { useParams } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import useField from '../services/useField'

const CommentsForm = () => {
  const comment = useField('text')
  const id = useParams().id
  const { addComment } = useCommentsActions()

  const submit = (event) => {
    event.preventDefault()
    const newComment = {
      comment: comment.value,
      blogId: id,
    }
    if (comment.value !== '' && id) {
      addComment(newComment)
      comment.reset()
    }
  }

  return (
    <form onSubmit={submit}>
      <TextField
        label="add a comment"
        size="small"
        value={comment.value}
        onChange={comment.onChange}
        id="comment"
        sx={{
          width: '30%',
          marginRight: '.5rem',
        }}
      />
      <Button type="submit" variant="contained">
        ADD COMMENT
      </Button>
    </form>
  )
}

export default CommentsForm
