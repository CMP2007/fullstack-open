import { useParams } from 'react-router-dom'

const Error404 = () => {
  const params = useParams()
  const notFound = params['*']

  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>The route "{notFound}" does not exist.</p>
    </div>
  )
}

export default Error404