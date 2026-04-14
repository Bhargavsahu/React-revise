import React from 'react'
import image from '../assets/dc.jpg'

function Logo({width = '100px'}) {
  return (
    <img src={image} className='w-15 h-15 rounded-full object-cover' alt="" />
  )
}

export default Logo