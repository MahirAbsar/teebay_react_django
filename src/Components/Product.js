import React from 'react'
import { Col, Card, ListGroup } from 'react-bootstrap'
function Product({ name, image, description, price }) {
  return (
    <>
      <Col md={6} sm={12} lg={4} className='rounded'>
        <Card style={{ width: '18rem' }} className='m-3'>
          <Card.Img variant='top' src={image} alt={name} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroup.Item>
              <strong>
                <h2>${price}</h2>
              </strong>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </>
  )
}

export default Product
