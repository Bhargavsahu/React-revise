import { createSlice , nanoid } from '@reduxjs/toolkit'

const initialState = {
    todos : []
}

export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state , action) => {
            const {text} = action.payload
            const todo = {
                id: nanoid(),
                text: text,
                isComplete: false,
                isEditable: false,
            }
            state.todos.push(todo)
        },
        removeTodo: (state , action) => {
            const {id} = action.payload 
            state.todos = state.todos.filter((todo) => (todo.id !== id))
        },
        editTodo: (state , action) => {
            const {id , text} = action.payload
            const todo = state.todos.find((t) => t.id === id)
            if(todo) {
                todo.text = text;
            }
        },
        toggleComplete: (state , action) => {
            const {id} = action.payload
            const todo = state.todos.find((t) => t.id === id)
            if(todo) {
                todo.isComplete = !todo.isComplete
            }
        },
        toggleEditable: (state , action) => {
            const {id} = action.payload
            const todo = state.todos.find((t) => t.id === id)
            if (todo) {
                todo.isEditable = !todo.isEditable
            }
        }
    }
})

export const {addTodo , editTodo , removeTodo , toggleComplete , toggleEditable} = TodoSlice.actions

export default TodoSlice.reducer