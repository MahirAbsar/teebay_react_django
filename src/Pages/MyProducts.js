import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../features/user/userSlice'
import axios from 'axios'
function MyProducts() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const { userInfo } = useSelector((store) => store.user)
  useEffect(() => {
    async function getUserProducts() {
      const { data } = await axios.get('/api/userproducts/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      setProducts(data)
    }
    getUserProducts()
  }, [])
  return (
    <Container>
      <Button
        variant='danger'
        onClick={() => {
          dispatch(logout())
        }}
        style={{ width: '150px', marginLeft: '90%' }}
      >
        Danger
      </Button>

      <h1 className='text-center'>My Products</h1>
      <section className='py-5'>
        {products.map((product) => {
          const { id, name, price, description } = product
          return (
            <article
              key={id}
              className='p-3 rounded my-2'
              style={{
                border: '2px solid black',
                width: '50rem',
                margin: '0 auto 0 auto',
              }}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <h1 style={{ maxWidth: '15em' }}>{name}</h1>
                <h2>
                  <i
                    className='fa-solid fa-trash'
                    onClick={() => {
                      console.log(id)
                    }}
                    style={{ cursor: 'pointer' }}
                  ></i>
                </h2>
              </div>
              <p>Price: ${price}</p>
              <p className='lead'>{description}</p>
            </article>
          )
        })}
      </section>
    </Container>
  )
}

export default MyProducts
