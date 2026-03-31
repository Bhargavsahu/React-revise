import { useState } from 'react'
import './App.css'

function App() {

  const [Counter, setCounter] = useState(15);

  const addValue = () => {
    setCounter(prev => prev + 1);
  }

  const removeValue = () => {
    setCounter(prev => prev - 1);
  }

  return (
    <>
      <div>
        {Counter}
      </div>
      <button onClick={addValue}>+</button>
      <button onClick={removeValue}>-</button>
    </>
  )
}

export default App
