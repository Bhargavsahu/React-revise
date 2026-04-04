import {createContext , useContext} from 'react'

export const TodoContext = createContext({
    Todos: [{
        id: 1,
        todo: 'do work',
        iscomplete: false
    }] ,
    AddTodo: (id) => {},
    EditTodo: (id , todo) => {},
    RemoveTodo: (id) => {},
    ToggleComplete: (id) => {}
})

export const useTodo = () => {
    return (
        useContext(TodoContext)
    )
}

export const TodoProvider = TodoContext.Provider