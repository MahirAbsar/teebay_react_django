import React, { useState } from 'react'
import { Col, Card, ListGroup, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
function Product({ id, name, description, price, rentPrice, rentDuration }) {
  const [showMore, setShowMore] = useState(false)
  return (
    <>
      <Col md={6} lg={4}>
        <Card
          style={{ margin: '0 auto' }}
          className='m-3 border border-3 rounded-3 customCard'
        >
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
              <div className='d-flex justify-content-between align-items-md-center'>
                <p>Price: ${price}</p>
                <p>
                  Rent Price: {rentPrice}$ {rentDuration.toUpperCase()}
                </p>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </>
  )
}

export default Product
