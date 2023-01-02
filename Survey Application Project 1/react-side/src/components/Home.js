import React from 'react'
import './Home.css'
import Login from './Login'

function Home() {
  return (
    <div className='home-div'>
        <div>
          <h1 id="">Create Your </h1><br/>  
          <h1>Own Surveys</h1>
        </div>
        <Login />
    </div>
  )
}

export default Home