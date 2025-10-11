import React from 'react'
import { Outlet } from 'react-router-dom'

export default function User() {
  return (
    <div>
      <h2 className='text-2xl my-4 '>User Page</h2>
      <Outlet/>
    </div>
  )
}
