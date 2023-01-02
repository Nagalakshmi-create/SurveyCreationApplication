import Sidebar from "./Sidebar";
import List from "./List";
import './Admin.css'


const Admin = () => {
    return(
        <div>
            <div className="admin-div">
                <Sidebar />
                <List/>
            </div>
        </div>
        
        
    )
}

export default Admin;