import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './features/user/userSlice'
import ModalReducer from './features/modal/modalSlice'
import './features/user/userSlice'

export const store = configureStore({
  reducer: {
    user: UserReducer,
    modal: ModalReducer,
  },
})
