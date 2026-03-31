import { useState } from 'react'
import Button from './components/Button'

function App() {
  const [Color, setColor] = useState('olive')

  return (
    <>
      <div className='w-full h-screen' style={{backgroundColor: Color}}>
        <div className='flex flex-wrap fixed bottom-12 left-1/2 -translate-x-1/2 bg-white text-black justify-center p-2 gap-2 shadow-xl w-1/2 rounded-2xl'>
          <Button color={'red'} changer={setColor}/>
          <Button color={'blue'} changer={setColor}/>
          <Button color={'orange'} changer={setColor}/>
          <Button color={'black'} changer={setColor}/>
          <Button color={'white'} textColor='black' changer={setColor}/>
          <Button color={'yellow'} changer={setColor}/>
          <Button color={'purple'} changer={setColor}/>
          <Button color={'gray'} changer={setColor}/>
          <Button color={'olive'} changer={setColor}/>
        </div>
      </div>
    </>
  )
}

export default App
