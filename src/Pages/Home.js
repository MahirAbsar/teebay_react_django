import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import Product from '../Components/Product'
import Pagination from '../Components/Pagination'

function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true)
        const { data } = await axios.get('/api/products')
        setProducts(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
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
          {/* {products.map((product) => {
            return <Product key={product.id} {...product} />
          })} */}
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
