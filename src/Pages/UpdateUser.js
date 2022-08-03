import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormContainer from '../Components/FormContainer'
import axios from 'axios'
import { logout } from '../features/user/userSlice'
function UpdateUser() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let { userInfo } = useSelector((store) => store.user)
  useEffect(() => {
    if (userInfo == null) {
      navigate('/')
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(firstName, lastName, address, phoneNumber, email, password)
    try {
      const { data } = await axios.put(
        '/api/users/updateuser/',
        {
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      const newUserInfo = {
        ...userInfo,
        name: data.name,
        email: data.email,
        password: data.password,
      }
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
      dispatch(logout())
      // toast.success('Profile Updated', {
      //   position: 'top-center',
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // })
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }
  const [firstName, setFirstName] = useState(
    `${userInfo ? userInfo.first_name : ''}`
  )
  const [lastName, setLastName] = useState(
    `${userInfo ? userInfo.last_name : ''}`
  )
  const [email, setEmail] = useState(`${userInfo ? userInfo.email : ''}`)
  const [address, setAddress] = useState(`${userInfo ? userInfo.address : ' '}`)
  const [phoneNumber, setPhoneNumber] = useState(
    `${userInfo ? userInfo.phoneNumber : ''}`
  )
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        {/* First Name */}
        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Label>
            <strong>Name</strong>
          </Form.Label>
          <Form.Control
            required
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='Your Name'
          />
        </Form.Group>
        {/* Last Name */}
        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Label>
            <strong>Name</strong>
          </Form.Label>
          <Form.Control
            required
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Your Name'
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
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
          />
        </Form.Group>
        {/* Phone Number */}
        <Form.Group className='mb-3' controlId='phoneNumber'>
          <Form.Label>
            <strong>Password</strong>
          </Form.Label>
          <Form.Control
            type='text'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='Phone Number'
          />
        </Form.Group>
        {/* Password */}
        <Form.Group className='mb-3' controlId='formBasicPassword2'>
          <Form.Label>
            <strong>Password</strong>
          </Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        </Form.Group>
        {/* Confirm Password */}
        <Form.Group className='mb-3' controlId='formBasicPassword2'>
          <Form.Label>
            <strong>Password</strong>
          </Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Password'
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
    </FormContainer>
  )
}

export default UpdateUser
