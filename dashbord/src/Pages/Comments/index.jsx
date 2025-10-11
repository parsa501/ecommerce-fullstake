import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Comments() {
  return (
    <div>
      <h2 className='text-2xl my-4 '>User Comments</h2>
      <Outlet/>
    </div>
  )
}
