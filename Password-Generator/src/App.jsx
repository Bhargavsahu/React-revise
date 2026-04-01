import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [Length, setLength] = useState(6)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [Password, setPassword] = useState('')
  const [buttonColor, setbuttonColor] = useState('orange')

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(Password)
  } , [Password])

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(charAllowed ) str = str + '!@#$%^&*_+~{[}]'
    if(numAllowed) str = str + '1234567890'
    for(let i = 1 ; i <= Length ; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [Length , charAllowed , numAllowed , setPassword])

  useEffect(() => {
    passwordGenerator()
  } , [Length , numAllowed , charAllowed , passwordGenerator])

  const passwordref = useRef(null)

  return (
    <>
    <div className='w-full h-screen bg-black'>
      <div className='fixed w-full max-w-lg mx-auto p-4 -translate-x-1/2  left-1/2 top-1/5 bg-gray-800 rounded-lg'>
        <h1 className='text-white p-2 text-center'>Password generator</h1>
        <div className='flex justify-center overflow-hidden rounded-lg shadow-lg'>
          <input type="text" value={Password} readOnly placeholder='Password' ref={passwordref} className='p-2 outline-none bg-white w-full'/>
          <button
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = 'black'
              e.currentTarget.style.color = 'white'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = 'orange'
              passwordref.current?.select()
              copyPassword();
            }}
            style={{ backgroundColor: buttonColor }} className='p-2 cursor-pointer px-3 py-0.5'>Copy</button>
        </div>
        <div className='flex items-center justify-between'>
          <div className='p-2 flex items-center' >
            <input type="range" min={6} max={100} value={Length} className='cursor-pointer p-2'
            onChange={(e) => {setLength(Number(e.target.value))}}
            />
            <label className='p-2 text-white'>Length: {Length}</label>
          </div>
            <div className='flex items-center'>
              <input type="checkbox" Checked={charAllowed} className='p-2'
                onChange={() => {
                  setcharAllowed((prev) => !prev)
                }}
              />
              <label className='p-2' >characters</label>
              <input type="checkbox" Checked={numAllowed} className='p-2'
                onChange={() => {
                  setnumAllowed((prev) => !prev)
                }} />
              <label className='p-2' >Numbers</label>
            </div>
        </div>
      </div>
    </div>  
    </>
  )
}

export default App
