import React from 'react'
import { useState } from 'react'
import { useTodo } from '../Contexts'

function TodoForm() {

    const [Todo, setTodo] = useState('')
    const {AddTodo} = useTodo()

    const add = (e) => {
        e.preventDefault();
        if(!Todo) return
        AddTodo({Todo: Todo  , isComplete:false})
        setTodo('')
    }

  return (
    <form onSubmit={add} className='flex'>
        <input type="text"
        placeholder='write What to do...'
        value={Todo}
        onChange={(e) => {setTodo(e.currentTarget.value)}}
        className='text-white outline-none bg-white/20 w-full border-black rounded-l-lg px-3 py-1.5 '
        />
        <button type='submit' className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 cursor-pointer">Add</button>
    </form>
  )
}

export default TodoForm