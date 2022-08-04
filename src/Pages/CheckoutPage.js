import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { openModal } from '../features/modal/modalSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ModalComponent from '../Components/ModalComponent'
function CheckoutPage() {
  const navigate = useNavigate()
  const handlePurchase = (id) => {
    setType('buy')
    setIsBuy(true)
    dispatch(openModal())
  }
  const { isOpen } = useSelector((store) => store.modal)
  const { userInfo } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const user = searchParams.get('user')
  const name = searchParams.get('name')
  const price = searchParams.get('price')
  const rentPrice = searchParams.get('rentPrice')
  const rentDuration = searchParams.get('rentDuration')
  const description = searchParams.get('description')
  const [isBuy, setIsBuy] = useState(false)
  const [type, setType] = useState('')
  if (userInfo) {
    if (userInfo.id == user) {
      return (
        <Container>
          <h1>{name}</h1>
          <h3>Price: {price}</h3>
          <h3>
            Rent Price:${rentPrice} {rentDuration}
          </h3>
          <p>{description}</p>
        </Container>
      )
    }
  }

  return (
    <>
      {isOpen && (
        <ModalComponent
          isBuy={isBuy}
          message={
            isBuy
              ? 'Are you sure you want to buy this product?'
              : 'Rental Period'
          }
          data={{
            id,
            type,
            user: userInfo.token,
          }}
        />
      )}
      <Container className='p-6'>
        <h1>{name}</h1>
        <h3>Price: {price}</h3>
        <h3>
          Rent Price:${rentPrice} {rentDuration}
        </h3>
        <p>{description}</p>
        {userInfo ? (
          <div className='my-3' style={{ marginLeft: '85%' }}>
            <Button
              variant='primary'
              onClick={() => {
                handlePurchase(id)
              }}
            >
              Buy
            </Button>
            <Button
              className='mx-2'
              variant='secondary'
              onClick={() => {
                setIsBuy(false)
                dispatch(openModal())
              }}
            >
              Rent
            </Button>
          </div>
        ) : (
          <button
            className='btn btn-primary'
            onClick={() => {
              navigate('/login')
            }}
          >
            Log In
          </button>
        )}
      </Container>
    </>
  )
}

export default CheckoutPage
