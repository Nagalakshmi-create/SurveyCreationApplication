import './Sidebar.css'

const Sidebar = ()=> {
    return(
        <div className="sidebar-div">
            <br></br><br></br>
            <a href="/create" >New Survey</a><br></br><br></br>
            <hr></hr>
            <a href="/Admin" >List Survey</a>
            <hr></hr>
        </div>
    )
}

export default Sidebar