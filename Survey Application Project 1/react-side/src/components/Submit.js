import React from 'react'
import { Link } from "react-router-dom"
import './Submit.css'

function Submit() {
  return (
    <div id="submit-div">
        <h1 id="thank-you">
            Thank you.
        </h1>
        <Link id="create-btn" to="/">Logout</Link>

    </div>
  )
}

export default Submit