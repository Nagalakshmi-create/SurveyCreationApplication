import React, { useEffect, useState } from "react";
import './UserList.css';
import { Link } from "react-router-dom";
import { useParams} from "react-router-dom";
import axios from "axios";

function UserList() {
  const location = useParams();
  const surveyname = location.name;
  const url1 = "http://localhost:9000/target"
    const [userList, setUserList] = useState([]);
  const fetchData = () => {
    return fetch("http://localhost:9000/users").then((response) => response.json())
      .then((data) => setUserList(data)
      )
  }
  var email;
  const change = (e) =>{
    email=e.target.value;
  }

  function submit(){
    axios.post(url1, {
      surveyid: surveyname,
      usermail: email,
  }).then(res => {
  })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div id="userlist-div">
      <main>
        <h1> Users List</h1>
        <ul>
          {
            userList && userList.length > 0 && userList.map((obj, index) => (
                <li>
                    <input type="checkbox" onChange={(e)=>change(e)} value={obj.email}></input>
                    {obj.firstname}
                </li>
          ))}
        </ul><br></br>
        <Link id="create-btn" to="/submit" >Create</Link>
      </main>
    </div>
  )
}

export default UserList
// onClick={submit()}