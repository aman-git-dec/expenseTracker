import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
        <div className='min-h-screen flex justify-center items-center'>
            <div className='text-center'>
                <h2 className='text-4xl font-bold mb-4'>404</h2>
                <p className='text-xl text-gray-400 mb-4'>page not found</p>
                <Link to = {"/"} className='text-blue-500
                hover:text-blue-700 underline'>
                Return to Home</Link>
            </div>
        </div>
    </>
  )
}

export default NotFound