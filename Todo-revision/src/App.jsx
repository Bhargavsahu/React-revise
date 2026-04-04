import { useEffect, useState } from 'react'
import {TodoProvider , useTodo} from './contexts' 
import {TodoItem , Todoform} from './components' 

function App() {

  const [Todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => ([{id: Date.now() , ...todo} , ...prev]))
  }

  const updateTodo =  (id , todo) => {
    setTodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevtodo)=>(prevtodo.id !== id)))
  }

  const togglecomplete = (id) => {
    setTodos((prev) => prev.map((prevtodo) => (prevtodo.id === id  ? {...prevtodo , iscompleted: !prevtodo.iscompleted} : prevtodo )))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  } ,[])

  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(Todos))
  } , [Todos])

  return (
    <TodoProvider value={{addTodo , updateTodo , deleteTodo , Todos , togglecomplete}}>
      <div className='bg-[#172842] text-white w-full h-screen'>
        <div className=' w-full max-w-lg -translate-x-1/2 left-1/2 top-1/5 fixed text-white'>
          <h1 className='text-center w-full p-2'>To-do List</h1>
          <div className='mb-4'>
            <Todoform/>
          </div>
            <div className='flex flex-wrap gap-y-3'>
              {
              Todos.map((todo) => {
                return (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo} />
                  </div>
                )
              })
            }
            </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
