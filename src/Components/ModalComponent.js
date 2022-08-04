import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  cancelAction,
  closeModal,
  confirmBuyAction,
  confirmRentAction,
} from '../features/modal/modalSlice'
import 'react-toastify/dist/ReactToastify.css'
const ModalComponent = ({ message, data, isBuy }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isMessage } = useSelector((store) => store.cart)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  return (
    <aside className='custom-modal-container'>
      <div className='custom-modal'>
        <h4>{message}</h4>
        {isBuy && (
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => {
                dispatch(closeModal())
                dispatch(cancelAction())
              }}
            >
              No
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => {
                dispatch(closeModal())
                dispatch(confirmBuyAction(data))
                navigate('/')
              }}
            >
              Yes
            </button>
          </div>
        )}
        {!isBuy && (
          <>
            <div className='btn-container mt-5'>
              <input
                required
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                required
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button
              className='btn btn-danger mt-4'
              onClick={() => {
                dispatch(closeModal())
                dispatch(cancelAction())
              }}
            >
              Cancel
            </button>
            <button
              className='btn btn-primary mt-4 ms-2'
              onClick={() => {
                dispatch(closeModal())
                const newData = { ...data, startDate, endDate, type: 'Rent' }
                dispatch(confirmRentAction(newData))
              }}
            >
              Rent
            </button>
          </>
        )}
      </div>
    </aside>
  )
}
export default ModalComponent
