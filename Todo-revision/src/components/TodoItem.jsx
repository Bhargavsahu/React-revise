import React, { useState } from 'react'
import { useTodo } from '../contexts'


function TodoItem({ todo }) {
  const [IsTodoEditable, setIsTodoEditable] = useState(false)
  const [TodoMsg, setTodoMsg] = useState(todo.todo)
  const { updateTodo, deleteTodo, togglecomplete } = useTodo()

  const EditTodo = () => {
    updateTodo(todo.id, { ...todo, todo: TodoMsg })
    setIsTodoEditable(false)
  }

  const togglecompleted  = () => {
    togglecomplete(todo.id)
  }



  return (
    <div className={`flex rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.iscompleted ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}>
      <input type="checkbox"
        className='cursor-pointer'
        checked={todo.iscompleted}
        onChange={togglecompleted}
      />
      <input type="text"
        value={TodoMsg}
        onChange={(e) => { setTodoMsg(e.currentTarget.value) }}
        readOnly={!IsTodoEditable}
        className={` w-full bg-transparent rounded-lg outline-none
          ${todo.iscompleted ? 'line-through' : ""}
          ${IsTodoEditable ? 'borded-black/20 ': 'border-none'}`
        }

      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={(e) => {
          if (todo.iscompleted) return

          if (IsTodoEditable) {
            EditTodo();
          }
          else setIsTodoEditable((prev) => !prev)
        }}
        disabled={todo.iscompleted}

      >{IsTodoEditable ? "📁" : "✏️"}</button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => {
          deleteTodo(todo.id)
        }} >❌</button>
    </div>
  )
}

export default TodoItem