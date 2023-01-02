import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GetSurvey.css";

function View() {
  const [view, setview] = useState([]);
  const location = useParams();
  const surveyname = location.name;


  const url = "http://localhost:9000/mapping";
  function getId() {
    axios
      .post(url, {
        sname: surveyname,
      })
      .then((res) => {
        setview(res.data);
      });
  }

  useEffect((res, req) => {
    getId();
  }, []);

  return (
    <div id="survey-div">
      <h1 className="survey-heading">{surveyname}</h1>
      {view &&
        view.length > 0 &&
        view.map((obj, index) => (
          <form >
          <div>
            <div>
              <h2>{obj.question}</h2>
            </div>
            {Array.isArray(obj.answer) ? (
              <>
               {obj.answer.map(function(ans, i){
                return (
                  <div>
                    <input type="checkbox"/>
                    <label>{obj.answer[i]}</label>
                  </div>  
                );
              })}
              </>
            ) : (
              <>
                <input type="text"/>
              </>
            )}
          </div>
          </form>
        ))}
    </div>
  );
}

export default View;



