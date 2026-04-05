import {configureStore} from '@reduxjs/toolkit'
import TodoReducer from '../Features/TodoSlice'

export const store = configureStore({
    reducer: TodoReducer
})