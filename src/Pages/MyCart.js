import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
function MyCart() {
  const [cart, setCart] = useState([])
  const { userInfo } = useSelector((store) => store.user)
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
  return (
    <Container>
      {cart.map((singleProduct) => {
        const { id, product, type, rentStart, rentEnd } = singleProduct
        return (
          <div
            key={id}
            className='d-flex justify-content-between align-items-center'
          >
            <p className='lead'>{product}</p>
            <p className='lead'>{type}</p>
            <p className='lead'>
              <strong>Start: </strong> {rentStart || 'NA'}
            </p>
            <p className='lead'>
              <strong>End: </strong>
              {rentEnd || 'NA'}
            </p>
          </div>
        )
      })}
    </Container>
  )
}

export default MyCart
