import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './features/user/userSlice'
import ModalReducer from './features/modal/modalSlice'
import CartReducer from './features/cart/cartSlice'
import './features/user/userSlice'

export const store = configureStore({
  reducer: {
    user: UserReducer,
    modal: ModalReducer,
    cart: CartReducer,
  },
})
