import './User.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';


export default function User() {
  const url = "http://localhost:9000/matching";
  const [surveyName, setSurveyName] = useState([]);
  const fetchData = () => {
    return fetch("http://localhost:9000/list").then((response) => response.json())
      .then((data) => setSurveyName(data)
      )
  }


  // function getMatching(name){
  //   axios.post(url, {
  //     surveyname: name
  // }).then(res => {

  // })
  // }

  useEffect(() => {
    fetchData();

  }, [])
  // if(surveyName && surveyName.length > 0){
  //   surveyName.map((obj, index) => (
  //     console.log(obj.surveyname)
  //   ))
  // }

  return (
    <div id="user-div">
      <main>

        <h1> Survey List</h1>
        <table className='table table-bordered shadow-lg'>
          <thead className='table-dark'>
            <tr>
              <th>Survey</th>
              <th>Created by</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {surveyName && surveyName.length > 0 && surveyName.map((obj, index) => (
              <tr>
                <td>
                  <Link to={`/survey/${obj.surveyname}`}>{obj.surveyname}</Link>
                </td>
                <td>
                  {obj.createdby}
                </td>
                <td>
                  {moment(obj.createdate).format("YYYY-MM-DD")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}