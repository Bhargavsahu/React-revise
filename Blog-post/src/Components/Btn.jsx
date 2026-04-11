import React from 'react'

function Btn({
    children ,
    type = 'button',
    bgcolor = 'bg-blue-600',
    textcolor = 'white',
    classname = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${classname}${bgcolor}
    ${textcolor}`}{...props}>
        {children}
    </button>
  )
}

export default Btn