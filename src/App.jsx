import { useState, useEffect } from 'react'
import { login, logout } from './Store/AuthSlice'
import auth from './appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

import Header from './components/Headers/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const selector  = useSelector((state)=>state.status)
  useEffect(() => {
    auth.getCurrentUser()
    .then((userData) => {
      if (userData) {
        console.log(selector)
        dispatch(login({userData}))
        console.log(selector)
      } else {
        dispatch(logout())
      }
    })
    .catch((err)=>{
      console.log("user is not logged in")
    })
    .finally(() => setLoading(false))
  })

  return !loading ?  
  (<div className='min—h—screen flex flex—wrap justify-center bg—gray—400' >
<div className='w-full-block' >
<Header/>
<main className=" min—h—screen">
<Outlet />
</main>
<Footer/>
</div>
</div>)
  : (<h2>Loading...</h2>)
  }

export default App
