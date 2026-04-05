import React , {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addTodo} from '../Features/TodoSlice'

function TodoForm() {
    const [TodoMsg, setTodoMsg] = useState('')
    const dispatch = useDispatch()

    const Add = (e) => {
        e.preventDefault();
        if(TodoMsg) dispatch(addTodo({text: TodoMsg}))
        setTodoMsg('')
    }

  return (
    <form className='flex w-full' onSubmit={Add}>
          <input type="text"
              className='text-black p-3 bg-gray-300 outline-none rounded-l-lg shadow-lg w-full'
              placeholder='Write Todo here...'
              value={TodoMsg}
              onChange={(e) => {
                  setTodoMsg(e.currentTarget.value)
              }}
          />
          <button 
              className='bg-yellow-400 hover:bg-yellow-600 px-3 py-1.5 text-white rounded-r-lg cursor-pointer' 
              type='submit'>
              Add
          </button>
    </form>
  )
}

export default TodoForm