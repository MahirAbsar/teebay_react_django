import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  isOpen: false,
  isConfirm: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
    },
    closeModal: (state, action) => {
      state.isOpen = false
    },
    confirmBuyAction: (state, { payload: { id, type, user } }) => {
      axios
        .post(
          '/api/users/addtocart/',
          { id: id, type: 'buy' },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user}`,
            },
          }
        )
        .then(({ data }) => console.log(data))
        .catch((err) => {
          console.log(err)
        })
    },
    confirmRentAction: (
      state,
      { payload: { id, type, user, startDate: rentStart, endDate: rentEnd } }
    ) => {
      if ((rentStart, rentEnd)) {
        axios
          .post(
            '/api/users/addtocart/',
            {
              id,
              type: 'rent',
              rentStart,
              rentEnd,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user}`,
              },
            }
          )
          .then(({ data }) => console.log(data))
          .catch((err) => console.log(err))
      }
    },
    cancelAction: (state, action) => {
      state.isConfirm = false
    },
  },
})

export const {
  openModal,
  closeModal,
  confirmBuyAction,
  confirmRentAction,
  cancelAction,
} = modalSlice.actions

export default modalSlice.reducer
