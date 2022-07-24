import { useParams } from 'react-router-dom'
import products from '../products'
import { Container, Button, Row, Col } from 'react-bootstrap'
function ProductDetail() {
  const { id } = useParams()
  const { _id, name, image, price, description, category } = products.find(
    (product) => product._id == id
  )
  return (
    <Container className='py-5'>
      <h1>{name}</h1>
      <p>Category:{category}</p>
      <p>Price:{price}</p>
      <p>{description}</p>
      <div className='m-auto'>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col> </Col>
          <Col> </Col>
          <Col className='py-5'>
            <Button variant='primary'>Primary</Button>

            <Button variant='secondary' className='mx-3'>
              Rent
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default ProductDetail
