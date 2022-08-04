import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: [],
  isLoading: true,
  isMessage: false,
  count: 0,
}

export const getProducts = createAsyncThunk(
  'cart/getProducts',
  async (name) => {
    try {
      const resp = await axios(name)

      return resp.data
    } catch (error) {
      return 'something went wrong'
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.isMessage = true
    },
    hideMessage: (state, action) => {
      state.isMessage = false
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false
      state.products = action.payload
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false
    },
  },
})

export const { showMessage, hideMessage } = cartSlice.actions

export default cartSlice.reducer
