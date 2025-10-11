import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Posts() {
  return (
    <div>
      <h2 className='text-2xl my-4 '>Post Page</h2>
      <Outlet/>
    </div>
  )
}
