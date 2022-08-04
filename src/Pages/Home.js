import React, { useEffect } from 'react'
import Product from '../Components/Product'
import Pagination from '../Components/Pagination'
import { Container, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../features/cart/cartSlice'
function Home() {
  const { products, isLoading } = useSelector((store) => store.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts('/api/products'))
  }, [])
  if (isLoading) {
    return (
      <>
        <div className='loader-container'>
          <div className='lds-dual-ring'></div>
        </div>
      </>
    )
  }
  return (
    <div>
      <Container>
        <Row>
          {products.length > 0 ? (
            <Pagination
              data={products}
              RenderComponent={Product}
              title='Posts'
              pageLimit={3}
              dataLimit={6}
            />
          ) : (
            <h1 className='text-center'>No Products to display</h1>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default Home
