import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios';
import './Response.css';


function Response() {
  const location = useParams();
  const [data, setdata] = useState([]);
  const [question, setQuestion] = useState([]);
  const surveyname = location.name;
  // console.log(surveyname)
  const url = "http://localhost:9000/getresponse";
  // const url1 = "http://localhost:9000/getQuestion";

  useEffect(() => {
    //Runs only on the first render
    axios.post(url, {
      sname: surveyname
    }).then(res => {
      setdata(res.data)
    })

  }, []);


  return (
    <div id="response-div">
      <main>
        <h1>{surveyname}</h1>
        <table className='table table-bordered shadow-lg'>
          <thead className='table-dark'>
            <tr>
              <th>Submitted by</th>
              <th>Submitted at</th>
              <th>Questions</th>
              <th>Answers</th>
            </tr>
          </thead>
          {data && data.length > 0 && data.map((obj, index) => (
            
            <tbody>
              <tr>
                <td>
                {obj.userid}
                </td>
                <td className='status-font'>
                {obj.submitdate}
                </td>
                <td className='status-font'>
                {obj.quesid}
                </td>
                <td className='status-font'>
                {obj.answer}
                </td>
              </tr>
            </tbody>
          ))}

        </table>
      </main>
    </div>

  )
}

export default Response