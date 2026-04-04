import React from 'react'
import { useState } from 'react'
import { useTodo } from '../contexts'

function Todoform() {

    const [Todo, setTodo] = useState('')
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault();
        if (!Todo) return

        addTodo({ todo: Todo, iscompleted: false })
        setTodo("")
    }

    return (
        <form onSubmit={add} className='flex'>
            <input type="text"
                placeholder='write todo...'
                value={Todo}
                onChange={(e) => { setTodo(e.currentTarget.value) }}
                className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 cursor-pointer">
                Add
            </button>
        </form>
    )
}

export default Todoform