import { createSlice } from '@reduxjs/toolkit'

export const sesionSlice = createSlice({
  name: 'sesionActual',
  initialState: {
    value : false
  },
  reducers: {
    setToken : state => ( token ) => {
      state.value = token
    }
  }
})

export const { setToken } = sesionSlice.actions

export default sesionSlice.reducer