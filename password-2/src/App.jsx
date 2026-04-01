import { useEffect } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'

function App() {

  const [Password, setPassword] = useState('')
  const [Length, setLength] = useState('6')
  const [CharAllowed, setCharAllowed] = useState(false)
  const [numAllowed, setnumAllowed] = useState(false)
  const [Buttoncolor, setButtoncolor] = useState('orange')

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(Password)
  } , [Password])

  const PasswordGenerator = useCallback (() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxxyz'
    if(CharAllowed) str += '!@#$%^&*_+~{[}]'
    if(numAllowed) str += '1234567890'
    for(let i = 0 ; i<= Length ; i++) {
      let char = Math.floor(Math.random()*str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [Length , setPassword , CharAllowed , numAllowed])

  useEffect(() => {
    PasswordGenerator()
  } , [Length , CharAllowed , numAllowed , PasswordGenerator])

  const passwordref = useRef(null)

  return (
    <>
      <div className='w-full h-screen bg-black'>
        <div className='fixed -translate-x-1/2 left-1/2 top-1/5 bg-gray-600 rounded-lg w-full max-w-lg p-4 mx-auto'>
          <h1 className='text-center text-white p-2'>Password Generator</h1>
          <div className=' flex overflow-hidden rounded-lg shadow-lg w-full justify-center'>
            <input type="text" value={Password} ref={passwordref} placeholder='password' className='p-2 bg-white outline-none read-only w-full' />
            <button style={{ backgroundColor: Buttoncolor }} className='p-2'
              onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor = 'black'
                e.currentTarget.style.color = 'white'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor = 'orange';
                passwordref.current?.select();
                copyPassword();
              }}
            >Copy</button>
          </div>
          <div className='flex justify-between items-center text-white'>
            <div className='p-2 flex items-center'>
              <input type="range" min={6} max={100} value={Length}
                onChange={(e) => { setLength(Number(e.target.value)) }} />
              <label className='p-2'>Length: {Length}</label>
            </div>
            <div className='flex items-center'>
              <input type="checkbox" checked={CharAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
              />
              <label className='p-2'>characters</label>
              <input type="checkbox" checked={numAllowed}
                onChange={() => {
                  setnumAllowed((prev) => !prev)
                }} />
              <label className='p-2'>numbers</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
