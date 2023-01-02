import './Survey.css';
import React, { useState, useEffect } from "react"; 
import axios from 'axios'; 
import { useParams,Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";  
const Update = () => {
    const location = useParams();
    const oldname = location.name;
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const fetchData = () => {
        return fetch("http://localhost:9000/question").then((response)=> response.json()).then((data)=>setData(data))
    }
    const url = "http://localhost:9000/updateSurvey";
    const url1 = "http://localhost:9000/updateDraft";
    var selectted = [];
    var surveyName ;
    const onChangeHandler = (e) =>{
        selectted.push(e.target.value);
    }
    const changeHandler = (e)=>{
        surveyName = e.target.value;
    }
    function submit(){
        axios.post(url, {
            old: oldname,
            questions: selectted,
            surveyname: surveyName,
            status:"Created"
        }).then(res => {
        })
        navigate("/userlist")
    }
    function submit1(){
        axios.post(url, {
            old: oldname,
            questions: selectted,
            surveyname: surveyName,
            status:"Drafted"
        }).then(res => {
        })
        navigate("/submit")
    }
    useEffect(()=>{
        fetchData();
    }, [])
    return (
        <div className='survey-div'>
            <main>
                <h1 className="qus-heading">Questions</h1>
                <form>
                    <input type="text" onChange={(e)=>changeHandler(e)} placeholder='Enter Survey Name' style={{textAlign:'center', marginLeft: 20}} ></input><br/><br/>
                    {
                    data && data.length > 0 && data.map((obj, index)=>(
                        <div>
                            <input type="checkbox" onChange={(e)=>onChangeHandler(e)} value={obj.id} />{obj.question} <br /> <br />
                        </div>
                    ))
                    } 
                    <button type="button" onClick={submit1} className="survey-draft-btn">Draft</button>
                    <Link onClick={submit} to={`/userlist/${surveyName}`} className="survey-submit-btn">Update</Link>
                </form>
            </main>
        </div>
    )
}
export default Update