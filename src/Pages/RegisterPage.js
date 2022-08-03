import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../features/user/userSlice'
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Form from 'react-bootstrap/Form'
import FormContainer from '../Components/FormContainer'
import axios from 'axios'
function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords Dont Match', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      console.log(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        address,
        phoneNumber
      )
      // try {
      //   const { data } = await axios.post(
      //     '/api/users/registeruser/',
      //     { name: name, email: email, password: password },
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     }
      //   )
      //   localStorage.setItem('userInfo', JSON.stringify(data))
      //   dispatch(login())
      //   navigate('/')
      // } catch (err) {
      //   console.log(err)
      // }
    }
  }
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        {/* First Name  */}
        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Label>
            <strong>First Name</strong>
          </Form.Label>
          <Form.Control
            required
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
          />
        </Form.Group>
        {/* Last Name */}
        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Label>
            <strong>Last Name</strong>
          </Form.Label>
          <Form.Control
            required
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
          />
        </Form.Group>
        {/* Email */}
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
        {/* Address */}
        <Form.Group className='mb-3' controlId='address'>
          <Form.Label>
            <strong>Address</strong>
          </Form.Label>
          <Form.Control
            required
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
          />
        </Form.Group>
        {/* Phone Number */}
        <Form.Group className='mb-3' controlId='phoneNumber'>
          <Form.Label>
            <strong>Phone Number</strong>
          </Form.Label>
          <Form.Control
            required
            type='text'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='Phone Number'
          />
        </Form.Group>
        {/* Password 1 */}
        <Form.Group className='mb-3' controlId='formBasicPassword1'>
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
        {/* Password 2 */}
        <Form.Group className='mb-3' controlId='formBasicPassword2'>
          <Form.Label>
            <strong>Confirm Password</strong>
          </Form.Label>
          <Form.Control
            required
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='d-block mx-auto'>
          Submit
        </Button>
        <p className='lead mt-3'>
          Already Have An Account?{' '}
          <Link to='/login' className='text-decoration-none'>
            Login
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

export default RegisterPage
