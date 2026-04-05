import { useState } from 'react'
import {AddTodo , Todo} from './Components'

function App() {

  return (
    <>
      <div>
        <AddTodo/>
        <Todo/>
      </div>
    </>
  )
}

export default App
