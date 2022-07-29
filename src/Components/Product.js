import React, { useState } from 'react'
import { Col, Card, ListGroup, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
function Product({ id, name, description, price, rentPrice }) {
  const [showMore, setShowMore] = useState(false)
  return (
    <>
      <Col md={6} lg={4} className='text-sm-center'>
        <Card style={{ margin: '0 auto' }} className='m-3'>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            {!showMore && (
              <p className='lead'>
                {description.slice(0, 200)}....{' '}
                <strong
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowMore(true)}
                >
                  Show More
                </strong>
              </p>
            )}
            {showMore && (
              <p className='lead'>
                {description}
                <br />
                <strong
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowMore(false)}
                >
                  Show Less
                </strong>
              </p>
            )}
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroup.Item>
              <strong>
                <h4 className='text-center'>Price: ${price}</h4>
                <h4 className='text-center'>Rent Price: ${rentPrice}</h4>
              </strong>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </>
  )
}

export default Product
