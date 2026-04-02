import axios from 'axios'
const baseUrl = '/api/login'


const login = async Credentials => {
  const request = await axios.post(baseUrl, Credentials)
  const response = request.data
  return response
}

export default { login }