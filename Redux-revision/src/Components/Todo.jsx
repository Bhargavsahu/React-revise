import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RemoveTodo, EditTodo, ToggleComplete } from '../Features/Todo/TodoSlice'

function Todo() {
    const todos = useSelector((state) => state.todos)
    const dispatch = useDispatch()
    return (
        <>
            <div>
                Todos
                <div>
                    {
                        todos.map((todo) => (
                            <div key={todo.id}>

                                <input
                                    type="checkbox"
                                    checked={todo.isComplete}
                                    onChange={() => dispatch(ToggleComplete({ id: todo.id }))}
                                />

                                <span style={{ textDecoration: todo.isComplete ? "line-through" : "none" }}>
                                    {todo.text}
                                </span>

                                <button onClick={() => dispatch(RemoveTodo({ id: todo.id }))}>
                                    ❌
                                </button>

                                <button onClick={() => {
                                    
                                }}>
                                    ✏️
                                </button>

                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Todo