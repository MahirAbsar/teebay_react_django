import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
function BrowseProducts() {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <h1>Search Products</h1>
        </Col>
        <Col md={9}>
          <h1>Products</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default BrowseProducts
