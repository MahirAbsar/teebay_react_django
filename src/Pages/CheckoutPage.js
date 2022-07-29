import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { openModal } from '../features/modal/modalSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import ModalComponent from '../Components/ModalComponent'
function CheckoutPage() {
  const navigate = useNavigate()
  const handlePurchase = (id) => {
    setType('buy')
    setIsBuy(true)
    dispatch(openModal())
  }
  const { isOpen, isConfirm } = useSelector((store) => store.modal)
  const { userInfo } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  useEffect(() => {
    async function getProduct() {
      try {
        const { data } = await axios.get(`/api/products/${id}`)
      } catch (err) {
        console.log(err)
      }
    }
    getProduct()
  }, [])
  const [searchParams, setSearchParams] = useSearchParams()
  let id = searchParams.get('id')
  let user = searchParams.get('user')
  let name = searchParams.get('name')
  let price = searchParams.get('price')
  let rentPrice = searchParams.get('rentPrice')
  let rentDuration = searchParams.get('rentDuration')
  let description = searchParams.get('description')
  let [isBuy, setIsBuy] = useState(false)
  let [type, setType] = useState('')
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
          <div className='my-3'>
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
