import React from 'react'
import Header from '../../Header'
import { Outlet } from 'react-router'
import Footer from '../../Footer'



export default function MainLayout() {
  return (
    <>
      <div >
        <Header />
      </div>

      <div style={{height:700}} >
        <Outlet />
      </div>

      <div style={{marginTop:30}}>
        <Footer />
      </div>
    </>
  )
}
