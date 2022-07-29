import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { logout } from '../features/user/userSlice'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
function MyProducts() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [isDeleted, setIsDeleted] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((store) => store.user)
  const handleDelete = async (id) => {
    try {
      setIsLoading(true)
      const { data } = await axios.delete(`/api/deleteproduct/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      setIsLoading(false)
      setIsDeleted((prevValue) => !prevValue)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    async function getUserProducts() {
      try {
        setIsLoading(true)
        const { data } = await axios.get('/api/userproducts/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        setProducts(data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getUserProducts()
    setIsLoading(false)
  }, [isDeleted])
  if (isLoading) {
    return (
      <>
        <div className='loader-container'>
          <div className='lds-dual-ring'></div>
        </div>
      </>
    )
  }
  if (products.length == 0) {
    return (
      <>
        <Container>
          <h1 className='text-center'>You have no Products!!!</h1>
          <LinkContainer
            to='/addproduct'
            style={{ display: 'block', margin: '30px' }}
          >
            <Button
              variant='primary'
              style={{ display: 'block', margin: '30px auto' }}
            >
              Add A Product
            </Button>
          </LinkContainer>
        </Container>
      </>
    )
  }
  return (
    <Container>
      {isLoading && (
        <>
          <div className='loader-container'>
            <div className='lds-dual-ring'></div>
          </div>
        </>
      )}

      <Button
        variant='danger'
        onClick={() => {
          dispatch(logout())
          navigate('/login')
        }}
        style={{ width: '150px', marginLeft: '90%' }}
      >
        Logout
      </Button>

      <h1 className='text-center'>My Products</h1>
      <section className='py-5'>
        {products.map((product) => {
          const {
            id,
            name,
            price,
            description,
            category,
            rentPrice,
            rentDuration,
          } = product
          return (
            <article
              className='p-3 rounded my-2'
              key={id}
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
                      handleDelete(id)
                    }}
                    style={{ cursor: 'pointer' }}
                  ></i>
                </h2>
              </div>
              <LinkContainer key={id} to={`/updateproduct/${id}`}>
                <Button color='warning'>Update Item</Button>
              </LinkContainer>
              <h6>Category: {category.join('| ')} </h6>
              <p>Price: ${price}</p>
              <p>
                Rent Price: ${rentPrice} {rentDuration}
              </p>
              <p className='lead'>{description}</p>
            </article>
          )
        })}
      </section>
      <LinkContainer
        to='/addproduct'
        style={{ width: '150px', marginLeft: '90%' }}
      >
        <Button variant='primary'>Add A Product</Button>
      </LinkContainer>
    </Container>
  )
}

export default MyProducts
