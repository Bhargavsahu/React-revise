import {createContext , useContext} from "react"

export const TodoContext = createContext({
    Todos: [
        {
            
        }
    ] ,
    addTodo: (todo) => {},
    updateTodo: (id , todo) => {},
    deleteTodo: (id) => {},
    togglecomplete: (id) => {}
})


export const useTodo = () => {
    return (
        useContext(TodoContext)
    )
}

export const TodoProvider = TodoContext.Provider