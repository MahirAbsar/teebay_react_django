import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../features/user/userSlice'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormContainer from '../Components/FormContainer'
import { ToastContainer, toast } from 'react-toastify'
import { loginRequest } from '../features/user/userSlice'
import 'react-toastify/dist/ReactToastify.css'
function LoginPage() {
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/')
    }
  }, [])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email && password) {
      try {
        const { data } = await axios.post(
          '/api/users/token/',
          { username: email, password: password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        setTimeout(() => {
          navigate('/')
        }, 2000)
        toast.success('👍 You Are Logged In', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        dispatch(login())
      } catch (err) {
        toast.error(`${err.response.data.detail}`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.log(err.response.data.detail)
      }
    } else {
      console.log('Please Fill Out All The Fields')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>
            <strong>Email address</strong>
          </Form.Label>
          <Form.Control
            required
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>
            <strong>Password</strong>
          </Form.Label>
          <Form.Control
            required
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='d-block mx-auto'>
          Submit
        </Button>
        <p className='lead mt-3'>
          Don't Have An Account?{' '}
          <Link to='/register' className='text-decoration-none'>
            Register
          </Link>{' '}
        </p>
      </Form>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </FormContainer>
  )
}

export default LoginPage
