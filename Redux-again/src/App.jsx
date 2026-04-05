import { useState } from 'react'
import { TodoForm , TodoItem } from './Components'
import {useSelector} from 'react-redux'

function App() {
  const todos = useSelector((state) => (state.todos))
  return (
    <div className='w-full h-screen bg-[#172842]'>
      <div className='w-full max-w-lg fixed -translate-x-1/2 left-1/2 top-1/5 shadow-lg '>
        <h1 className='text-white text-center py-3'>Manage your Todos</h1>
        <div className='w-full flex'>
          <TodoForm/>
        </div>
        <div className='pt-4 flex gap-2 flex-col'>
          {
            todos.map((todo) => {
              return (
                <div className='w-full' key={todo.id}>
                  <TodoItem todo={todo} />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App
