import { configureStore } from '@reduxjs/toolkit'
import sesionSlice from './sesionSlice'

export default configureStore({
  reducer: {
    counter: sesionSlice
  },
})