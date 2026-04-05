import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { editTodo, toggleComplete, removeTodo, toggleEditable } from '../Features/TodoSlice'

function TodoItem({ todo }) {
    const [TodoMsg, setTodoMsg] = useState(todo.text)
    const dispatch = useDispatch()

    return (
        <div>
            <div className={`w-full rounded-lg duration-300 px-3 py-3 gap-x-3 flex justify-center ${todo.isComplete ? 'bg-gray-700' : 'bg-[#694f3f]'}`}>
                <input
                    className={`inline-flex items-center`}
                    disabled={todo.isEditable}
                    checked={todo.isComplete}
                    onChange={() => {
                        dispatch(toggleComplete({ id: todo.id }))
                    }}
                    type="checkbox" />
                <input
                    value={TodoMsg}
                    onChange={(e) => { setTodoMsg(e.currentTarget.value) }}
                    readOnly={!todo.isEditable}
                    className={`w-full text-white bg-transparent items-center border rounded-md px-2 py-2 focus:outline-none cursor-default
                        ${todo.isEditable ? 'border-white' : 'border-none'}
                        ${todo.isComplete ? 'line-through' : ''}`}
                    type="text" />
                <button 
                    className='inline-flex items-center cursor-pointer disabled:opacity-50 disabled:cursor-default'
                    disabled={todo.isComplete}
                    onClick={() => {
                    if (todo.isEditable && TodoMsg.trim()) {
                        dispatch(editTodo({ id: todo.id, text: TodoMsg }))
                    }
                    dispatch(toggleEditable({ id: todo.id }))
                }}>{todo.isEditable ? '💾' : '✍️'}</button>
                <button
                    className='inline-flex items-center cursor-pointer' 
                    onClick={() => {
                    dispatch(removeTodo({ id: todo.id }))
                }}>🗑️</button>
            </div>
        </div>
    )
}

export default TodoItem 