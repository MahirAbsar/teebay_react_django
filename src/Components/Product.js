import React from 'react'
import { Col, Card, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
function Product({ id, name, image, description, price }) {
  return (
    <>
      <LinkContainer style={{ cursor: 'pointer' }} to={`/products/${id}`}>
        <Col md={6} lg={4} className='text-sm-center'>
          <Card style={{ margin: '0 auto' }} className='m-3'>
            <Card.Img variant='top' src={image} alt={name} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroup.Item>
                <strong>
                  <h2 className='text-center'>${price}</h2>
                </strong>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </LinkContainer>
    </>
  )
}

export default Product
