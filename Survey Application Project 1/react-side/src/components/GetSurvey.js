import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GetSurvey.css";

function GetSurvey() {
  const [survey, setSurvey] = useState([]);
  var answer = {};
  const navigate = useNavigate();
  const location = useParams();
  const surveyname = location.new;


  const url = "http://localhost:9000/mapping";
  function getId() {
    axios
      .post(url, {
        sname: surveyname,
      })
      .then((res) => {
        setSurvey(res.data);
      });
  }


  useEffect((res, req) => {
    getId();
  }, []);

  if(survey && survey.length > 0){
    console.log(survey[0].id)
    let n = survey.length;
    for(let i=0; i<n; i++){
      answer[survey[i].id] = "";
    }
    
  }

  const url2 = "http://localhost:9000/sendResponse"
  
  const handleChange=(e)=>{
    // const newData = { ...answer};
    answer[e.target.id] = e.target.value;
    // console.log("new data",answer);
  }

  function submit(e) {
    console.log(answer);
    // e.preventDefault();
      axios
        .post(url2, {
          sname: surveyname,
          answer
        })
        .then((res) => {
        });
        navigate("/submit")

  }


  return (
    <div id="survey-div">
      <h1 className="survey-heading">{surveyname}</h1>
      {survey &&
        survey.length > 0 &&
        survey.map((obj, index) => (
          <form onSubmit={(e)=>submit(e)}>
          <div>
            <div>
              <h2>{obj.question}</h2>
            </div>
            {Array.isArray(obj.answer) ? (
              <>
               {obj.answer.map(function(ans, i){
                return (
                  <div>
                    <input onChange={(e)=>handleChange(e)} id={obj.id} value={obj.answer[i]} type="checkbox"/>
                    <label>{obj.answer[i]}</label>
                  </div> 
                );
              })}
              </>
            ) : (
              <>
                <input id={obj.id} onChange={(e)=>handleChange(e)} type="text" />
              </>
            )}
          </div><br/><br/>
          </form>
        ))}
      <div id="survey-submit">
        <button onClick={(e)=>submit(e)} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}

export default GetSurvey;


