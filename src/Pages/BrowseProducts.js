import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/cart/cartSlice'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import SearchResults from '../Components/SearchResults'
function BrowseProducts() {
  const dispatch = useDispatch()
  const { products } = useSelector((store) => store.cart)
  const [isBuy, setIsBuy] = useState(false)
  const [isRent, setIsRent] = useState(false)
  const [name, setName] = useState('')
  const [rentType, setRentType] = useState('')
  const [category, setCategory] = useState('ELECTRONICS')
  const [lowPrice, setLowPrice] = useState(0)
  const [highPrice, setHighPrice] = useState(100)
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(
      getProducts(
        `/api/search/?name=${name}&category=${category}&buy=${isBuy}&rent=${isRent}&lowPrice=${lowPrice}&highPrice=${highPrice}&rentType=${rentType}`
      )
    )
  }
  return (
    <Container>
      <Row>
        <Col md={3}>
          <h1>Search</h1>
          <Form onSubmit={handleSubmit}>
            {/* Title Form Group  */}
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter Title'
              />
            </Form.Group>
            {/* Category Form Group */}
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label='Default select example'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='ELECTRONICS'>ELECTRONICS</option>
                <option value='HOME APPLIANCES'>HOME APPLIANCES</option>
                <option value='TOYS'>TOYS</option>
                <option value='SPORTING GOODS'>SPORTING GOODS</option>
                <option value='FURNITURES'>FURNITURES</option>
              </Form.Select>
            </Form.Group>
            {/* Radio Buttons */}
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className='mb-3'>
                <div>
                  <Form.Check
                    onClick={() => {
                      setIsBuy(true)
                      setIsRent(false)
                    }}
                    inline
                    label='Buy'
                    name='group1'
                    type={type}
                    id={`inline-${type}-1`}
                  />
                </div>
                {isBuy && (
                  <div className='d-flex justify-content-between align-items-lg-center'>
                    <Form.Control
                      style={{ width: '130px' }}
                      type='number'
                      id='inputPassword5'
                      value={lowPrice}
                      onChange={(e) => setLowPrice(e.target.value)}
                      aria-describedby='passwordHelpBlock'
                    />
                    -
                    <Form.Control
                      style={{ width: '130px' }}
                      type='number'
                      id='inputPassword5'
                      value={highPrice}
                      onChange={(e) => setHighPrice(e.target.value)}
                      aria-describedby='passwordHelpBlock'
                    />
                  </div>
                )}
                <div>
                  <Form.Check
                    onClick={() => {
                      setIsBuy(false)
                      setIsRent(true)
                    }}
                    inline
                    label='Rent'
                    name='group1'
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
                {isRent && (
                  <>
                    <div className='d-flex justify-content-between align-items-lg-center'>
                      <Form.Control
                        style={{ width: '130px' }}
                        type='number'
                        id='inputPassword5'
                        aria-describedby='passwordHelpBlock'
                        value={lowPrice}
                        onChange={(e) => setLowPrice(e.target.value)}
                      />
                      -
                      <Form.Control
                        style={{ width: '130px' }}
                        type='number'
                        id='inputPassword5'
                        aria-describedby='passwordHelpBlock'
                        value={highPrice}
                        onChange={(e) => setHighPrice(e.target.value)}
                      />
                    </div>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                      <Form.Label>Rent Type</Form.Label>
                      <Form.Select
                        aria-label='Default select example'
                        value={rentType}
                        onChange={(e) => {
                          setRentType(e.target.value)
                        }}
                      >
                        <option value='per hr'>Hourly</option>
                        <option value='per day'>Daily</option>
                      </Form.Select>
                    </Form.Group>
                  </>
                )}
              </div>
            ))}

            <Button variant='primary' type='submit'>
              Search
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          {products.length == 0 ? (
            <div className='d-flex justify-content-center align-align-items-center'>
              <h1>No products Found</h1>
            </div>
          ) : (
            <>
              <h1 className='text-center'>Products</h1>
              <SearchResults products={products} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default BrowseProducts
