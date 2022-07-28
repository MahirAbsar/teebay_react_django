import { useDispatch } from 'react-redux'
import {
  cancelAction,
  closeModal,
  confirmAction,
} from '../features/modal/modalSlice'
const ModalComponent = ({ message, data }) => {
  const dispatch = useDispatch()
  return (
    <aside className='custom-modal-container'>
      <div className='custom-modal'>
        <h4>{message}</h4>
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
              dispatch(confirmAction(data))
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </aside>
  )
}
export default ModalComponent
