import React, { useState } from 'react'
import {useTodo} from '../Contexts'

function TodoItem({todo}) {
    const [TodoMsg, setTodoMsg] = useState(todo.Todo)
    const [IstodoEditable, setIstodoEditable] = useState(false)

    const {EditTodo , RemoveTodo , ToggleComplete} = useTodo()

    const Edit = () => {
        EditTodo(todo.id , {...todo , todo: TodoMsg})
        setIstodoEditable(false)
    }
    const Complete = () => {
        ToggleComplete(todo.id)
    }
    
 
  return (
    <div>
          <div className={`flex p-2 px-3 py-1.5 gap-x-3 duration-1000 shadow-sm shadow-white-50 rounded-lg ${todo.isComplete ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]' }`}>
              <input type="checkbox"
                className=''
                checked={todo.isComplete}
                onChange={Complete}
              />
              <input type="text"
                  className={`outline-none border w-full
                    ${todo.isComplete ? 'line-through' : '' }
                    ${IstodoEditable ? 'border-black/20' : 'border-none' }`}
                  value={TodoMsg}
                  onChange={(e) => { setTodoMsg(e.currentTarget.value) }}
                  readOnly={!IstodoEditable}
              />
              <button
                className='inline-flex w-8 h-8 rounded-lg text-sm justify-center items-center bg-gray-50 hover:bg-gray-300 shrink-0 border-black/10 disabled:opacity-50'
                onClick={() => {
                    if(todo.isComplete) return
                    if(IstodoEditable) {
                        Edit();
                    }else {
                        setIstodoEditable((prev) => !prev)
                    }
                }}
                disabled = {todo.isComplete}
              >{IstodoEditable ? '📁' : '✏️' }</button>
              <button className='inline-flex w-8 h-8 rounded-lg text-sm justify-center items-center bg-gray-50 hover:bg-gray-300 shrink-0 border-black/10 disabled:opacity-50' onClick={() => {
                RemoveTodo(todo.id)
              }}>❌</button>
          </div>
    </div>
  )
}

export default TodoItem