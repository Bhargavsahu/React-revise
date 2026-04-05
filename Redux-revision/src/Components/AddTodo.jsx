import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {addTodo} from '../Features/Todo/TodoSlice'

function AddTodo() {
    const [Input, setInput] = useState('')
    const dispatch = useDispatch()
    const AddTodoHandler = (e) => {
        e.preventDefault();
        dispatch(addTodo({text: Input}))
        setInput('')
    }
  return (
    <form onSubmit={AddTodoHandler}>
        <input 
        placeholder='write a todo...'
        className=''
        value={Input}
        onChange={(e)=> {
            setInput(e.currentTarget.value)
        }}
        type="text" />
        <button type='submit'>Add</button>
    </form>
  )
}

export default AddTodo