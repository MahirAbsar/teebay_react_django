import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap'
import products from '../products'
import axios from 'axios'
import Product from '../Components/Product'

function Home() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    getData()
  }, [])
  return (
    <div>
      <Container>
        <Row>
          {products.map((product) => {
            return <Product key={product.id} {...product} />
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Home
