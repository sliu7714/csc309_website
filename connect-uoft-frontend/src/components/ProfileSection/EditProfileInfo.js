import "./styles.css"
import { users } from "../../data/data"


const EditProfile = (props)=>{
    const user1 = users[props.user]
    return(   
        <div className="profile-container">
            <h1 className="section_title">My Details</h1>
            <form id="profile_details">

                <label>Name: </label>
                <input className="detail_input" placeholder={user1.name}></input><br/>
                <label>Email: </label>
                <input className="detail_input" placeholder={user1.email}></input><br/>
                <label>Username: </label>
                <input className="detail_input" placeholder={user1.username}></input><br/>
                <label>Password: </label>
                <input type="password" className="detail_input" placeholder={user1.password}></input><br/>
                {/* Submission disabled for now */}
                <input className="_button" id="detail_submit" disabled type="submit" value="Submit"/>
            </form>
        </div> 
)
}
export default EditProfile