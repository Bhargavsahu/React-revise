import React from 'react'

function Button({color , changer }) {

  const dynamicColor = color === 'white' || color === 'yellow' ? 'black' : 'white';

  return (
    <button 
    onClick={() => {changer(color)}} 
    style={{backgroundColor: color}}
    className={`px-4 py-2 rounded font-semibold border-2 ${dynamicColor === 'black' ? 'text-black' : "text-white"}`}
    >
        {color}
    </button>
  )
}

export default Button