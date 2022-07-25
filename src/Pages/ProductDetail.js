import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Button, Row, Col } from 'react-bootstrap'
function ProductDetail() {
  const [product, setProduct] = useState({})
  const params = useParams()
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/api/products/${params.id}`)
      setProduct(data)
    }
    getData()
  }, [])
  const { name, description, price, category } = product
  return (
    <Container className='py-5'>
      <h1>{name}</h1>
      <p>Category:{category}</p>
      <p>Price:{price}</p>
      <p>{description}</p>
      <div className='m-auto'>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col> </Col>
          <Col> </Col>
          <Col className='py-5'>
            <Button variant='primary'>Primary</Button>
            <Button variant='secondary' className='mx-3'>
              Rent
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default ProductDetail
