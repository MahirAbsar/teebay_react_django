import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FormContainer from '../Components/FormContainer'
import { useSelector } from 'react-redux'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import axios from 'axios'
function UpdateProduct() {
  useEffect(() => {
    async function getUserProductDetail() {
      try {
        const { data } = await axios.get(`/api/products/${params.id}`)
        setProduct(data)
        setName(data.name)
        setPrice(data.price)
        setRentDuration(data.rentDuration || '')
        setRentPrice(data.rentPrice || '')
        setDescription(data.description)
        setCategory(data.category)
      } catch (err) {
        navigate(`/${userInfo.name}/products`)
      }
    }

    getUserProductDetail()
  }, [])
  const { userInfo } = useSelector((store) => store.user)
  const [product, setProduct] = useState({})
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState([])
  const [description, setDescription] = useState('')
  const [rentPrice, setRentPrice] = useState('')
  const [rentDuration, setRentDuration] = useState('')
  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newProductInfo = {
      name,
      price,
      category,
      rentPrice,
      rentDuration,
      description,
    }
    const { data } = await axios.put(
      `/api/updateproduct/${product.id}/`,
      newProductInfo,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )
    navigate(`/${userInfo.name}/products/`)
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
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Product Name'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPrice'>
          <Form.Label>
            <strong>Price</strong>
          </Form.Label>
          <Form.Control
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
          aria-label='Default select example'
          multiple
          value={category}
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
            aria-label='Default select example'
            value={rentDuration}
            onChange={(e) => setRentDuration(e.target.value)}
          >
            <option value='per hr'>Hourly</option>
            <option value='per day'>Daily</option>
          </Form.Select>
        </Form.Group>
        <Button variant='primary' type='submit' className='d-block mx-auto'>
          Update
        </Button>
      </Form>
    </FormContainer>
  )
}

export default UpdateProduct
