import { useDispatch } from 'react-redux'
import { closeModal } from '../features/modal/modalSlice'
const ModalComponent = () => {
  const dispatch = useDispatch()
  return (
    <aside className='modal-container'>
      <div className='custom-modal'>
        <h4>Are you Sure You Want To Delet This Product?</h4>
        <div className='btn-container'>
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => {
              dispatch(closeModal())
            }}
          >
            No
          </button>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => {
              dispatch(closeModal())
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
