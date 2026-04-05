import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    todos: []
}

export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const {text} = action.payload
            const todo = {
                id: nanoid(),
                text: text,
                isComplete: false
            }
            state.todos.push(todo)
        },
        RemoveTodo: (state, action) => {
            const {id} = action.payload
            state.todos = state.todos.filter((todo) => (todo.id !== id))
        },
        EditTodo: (state, action) => {
            const { id, text } = action.payload
            const Desiredtodo = state.todos.find((todo) => (todo.id === id))
            if (Desiredtodo) {
                Desiredtodo.text = text
            }
        },
        ToggleComplete: (state, action) => {
            const {id} = action.payload
            const Desiredtodo = state.todos.find((todo) => (todo.id === id))
            if (Desiredtodo) {
                Desiredtodo.isComplete = !Desiredtodo.isComplete
            }
        }
    }
})

export const {addTodo , EditTodo , RemoveTodo , ToggleComplete} = TodoSlice.actions

export default TodoSlice.reducer