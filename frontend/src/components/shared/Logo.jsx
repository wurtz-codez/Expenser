import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/' className='text-2xl font-bold text-white'>
      <img src='/src/assets/expenser-logo.png' alt='logo' className='w-500 h-20 '/>
    </Link>
  )
}

export default Logo