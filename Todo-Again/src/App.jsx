import { useState } from 'react'
import { TodoProvider } from './Contexts'
import { useEffect } from 'react'
import { TodoForm , TodoItem } from './Components'

function App() {
  const [Todos, setTodos] = useState([])

  const AddTodo = (todo) => {
    setTodos((prev) => ([{id: Date.now() , ...todo} , ...prev]))
  }

  const EditTodo = (id , todo) => {
    setTodos((prev) => prev.map((Prevtodo) => (Prevtodo.id === id ? todo : Prevtodo)))
  }

  const RemoveTodo = (id) => {
    setTodos((prev) => prev.filter((prevtodo) => (prevtodo.id !== id)))
  }

  const ToggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo , isComplete: !prevTodo.isComplete} : prevTodo) ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0) {
      setTodos(todos)
    }
  } , [])

  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(Todos))
  } , [Todos])

  return (
    <TodoProvider value={{AddTodo , EditTodo , RemoveTodo , ToggleComplete , Todos}}>
      <div className='bg-[#172842] h-screen'>
        <div className='w-full max-w-lg fixed -translate-x-1/2 left-1/2 top-1/5'>
          <h1 className='text-center text-white font-bold p-2'>Manage your todos</h1>
          <div className='mb-4'>
            <TodoForm/>
          </div>
          <div className='flex flex-wrap gap-y-3'>
            {Todos.map((todo)=>{
            return (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
