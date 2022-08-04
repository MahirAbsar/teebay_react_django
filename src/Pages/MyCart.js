import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
function MyCart() {
  const [cart, setCart] = useState([])
  const { userInfo } = useSelector((store) => store.user)
  const [filter, setFilter] = useState('Purchased')
  const { id } = useParams()
  useEffect(() => {
    async function getUserCart() {
      try {
        const { data } = await axios.get(`/api/users/cart/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        setCart(data)
      } catch (err) {
        console.log(err)
      }
    }
    getUserCart()
  }, [])
  if (cart.length == 0) {
    return <h1 className='text-center'>No Item Bought,rented or Sold</h1>
  }
  return (
    <Container>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              onClick={() => setFilter('Purchased')}
            >
              Purchased
            </ListGroup.Item>
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              onClick={() => setFilter('Rented')}
            >
              Rented
            </ListGroup.Item>
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              onClick={() => setFilter('Sold')}
            >
              Sold
            </ListGroup.Item>
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              onClick={() => setFilter('Lented')}
            >
              Lented
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col mid={9}>
          {cart
            .filter((singleProduct) => {
              return singleProduct.type == filter
            })
            .map((singleProduct, index) => {
              const {
                product: {
                  id,
                  name,
                  price,
                  rentDuration,
                  rentPrice,
                  description,
                },
                type,
                rentStart,
                rentEnd,
              } = singleProduct
              return (
                <div className='p-3 border border-3 mb-3' key={index}>
                  <h1>{name}</h1>
                  {(type == 'Purchased' || type == 'Sold') && (
                    <>
                      <p>{type}</p>
                      <p>Price: {price}</p>
                    </>
                  )}
                  {(type == 'Rented' || type == 'Lented') && (
                    <>
                      <p>{type}</p>
                      <p>Price: {rentPrice}</p>
                      <p>
                        From {rentStart} to {rentEnd}
                      </p>
                    </>
                  )}

                  <p>{description}</p>
                </div>
              )
            })}
        </Col>
      </Row>
    </Container>
  )
}

export default MyCart
