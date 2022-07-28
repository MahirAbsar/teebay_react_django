import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { cancelAction, openModal } from '../features/modal/modalSlice'
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios'
import ModalComponent from '../Components/ModalComponent'
function CheckoutPage() {
  const handlePurchase = (id) => {
    setType('buy')
    setIsBuy(true)
    dispatch(openModal())
    if (isConfirm) {
      axios
        .post(
          '/api/users/addtocart/',
          { id: id, type: 'buy' },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        )
        .then(({ data }) => console.log(data))
        .catch((err) => {
          console.log(err)
        })
      dispatch(cancelAction())
    }
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
  let name = searchParams.get('name')
  let price = searchParams.get('price')
  let rentPrice = searchParams.get('rentPrice')
  let description = searchParams.get('description')
  const [isBuy, setIsBuy] = useState(false)
  const [type, setType] = useState('')
  return (
    <>
      {isOpen && (
        <ModalComponent
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
      <Container>
        <h1>{name}</h1>
        <h3>Price: {price}</h3>
        <h3>Rent Price:${rentPrice}</h3>
        <p>{description}</p>
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
            variant='secondary'
            onClick={() => {
              setIsBuy(false)
              dispatch(openModal())
            }}
          >
            Rent
          </Button>
        </div>
      </Container>
    </>
  )
}

export default CheckoutPage
