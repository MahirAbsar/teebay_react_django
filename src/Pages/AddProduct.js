import React, { useState } from 'react'
import FormContainer from '../Components/FormContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
function AddProduct() {
  const { userInfo } = useSelector((store) => store.user)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState([])
  const [description, setDescription] = useState('')
  const [rentPrice, setRentPrice] = useState('')
  const [rentDuration, setRentDuration] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post(
      '/api/addproduct/',
      {
        name,
        price,
        category,
        description,
        rentPrice,
        rentDuration,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )
    navigate(`/${userInfo.name}/products`)
    setName('')
    setPrice('')
    setCategory([])
    setDescription('')
    setRentPrice('')
    setRentDuration('')
  }
  const handleCategory = (e) => {
    const selected = []
    for (let i = 0; i < e.target.selectedOptions.length; i++) {
      selected.push(e.target.selectedOptions.item(i).value)
    }
    setCategory(selected)
  }
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} style={{ width: '40rem' }}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>
            <strong>Name</strong>
          </Form.Label>
          <Form.Control
            required
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Your Name'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPrice'>
          <Form.Label>
            <strong>Price</strong>
          </Form.Label>
          <Form.Control
            required
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter Price'
          />
        </Form.Group>
        <Form.Label>
          <strong>Category</strong>
        </Form.Label>
        <Form.Select
          required
          aria-label='Default select example'
          multiple
          onChange={handleCategory}
        >
          <option value='ELECTRONICS'>ELECTRONICS</option>
          <option value='HOME APPLIANCES'>HOME APPLIANCES</option>
          <option value='TOYS'>TOYS</option>
          <option value='OUTDOOR'>OUTDOOR</option>
          <option value='FURNITURES'>FURNITURES</option>
        </Form.Select>
        <Form.Group className='mb-3' controlId='floatingTextarea2'>
          <Form.Label>
            <strong>Description</strong>
          </Form.Label>
          <FloatingLabel controlId='floatingTextarea2' label='Description'>
            <Form.Control
              as='textarea'
              placeholder='Tell Us More About Your Products'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicRentPrice'>
          <Form.Label>
            <strong>RentPrice</strong>
          </Form.Label>
          <Form.Control
            required
            type='number'
            value={rentPrice}
            onChange={(e) => setRentPrice(e.target.value)}
            placeholder='Enter Price'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicRentDuration'>
          <Form.Label>
            <strong>Rent Duration</strong>
          </Form.Label>
          <Form.Select
            required
            aria-label='Default select example'
            value={rentDuration}
            onChange={(e) => setRentDuration(e.target.value)}
          >
            <option value='per hr'>Hourly</option>
            <option value='per day'>Daily</option>
          </Form.Select>
        </Form.Group>
        <Button variant='primary' type='submit' className='d-block mx-auto'>
          Add
        </Button>
      </Form>
    </FormContainer>
  )
}

export default AddProduct
