import { createSlice } from '@reduxjs/toolkit'
const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  loading: true,
  userInfo: userInfo,
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    logout: (state) => {
      localStorage.removeItem('userInfo')
      state.userInfo = null
    },
  },
  extraReducers: {},
})

export const { logout, login } = userSlice.actions
export default userSlice.reducer
