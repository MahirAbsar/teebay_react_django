import React from 'react'
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap'
import products from '../products'
import Product from '../Components/Product'
function Home() {
  return (
    <div>
      <Container>
        <Row>
          {products.map((product) => {
            return <Product key={product._id} {...product} />
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Home
