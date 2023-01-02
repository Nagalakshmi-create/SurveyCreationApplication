import React from 'react'
import { useParams, Link } from "react-router-dom"
import Survey from './Survey';
import axios from 'axios';
import './UserList.css'

export default function UserStaticalPage() {
    const location = useParams();
    const surveyname = location.name

    const url = "http://localhost:9000/response"
    function submit() {
        
        axios.post(url, {
            sname: surveyname
        }).then(res => {
            console.log(res.data)
    })
    }

    return (
        <div className='body-container'>
            <div>
                <Survey />
            </div>
            <div id="submit-btn">
                <Link onClick={submit} to="/submit">Submit</Link>
            </div>
        </div>
    )
}
