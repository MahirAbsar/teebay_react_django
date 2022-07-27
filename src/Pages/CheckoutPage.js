import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import axios from 'axios'
function CheckoutPage() {
  useEffect(() => {
    async function getProduct() {
      try {
        const { data } = await axios.get(`/api/products/${id}`)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProduct()
  })
  const [searchParams, setSearchParams] = useSearchParams()
  let id = searchParams.get('id')
  let name = searchParams.get('name')
  let price = searchParams.get('price')
  let rentPrice = searchParams.get('rentPrice')
  let description = searchParams.get('description')
  return (
    <>
      <Container>
        <h1>{name}</h1>
        <h3>Price: {price}</h3>
        <h3>Rent Price:${rentPrice}</h3>
        <p>{description}</p>
        <div className='my-3'>
          <Button variant='primary'>Buy</Button>{' '}
          <Button variant='secondary'>Rent</Button>{' '}
        </div>
      </Container>
    </>
  )
}

export default CheckoutPage
