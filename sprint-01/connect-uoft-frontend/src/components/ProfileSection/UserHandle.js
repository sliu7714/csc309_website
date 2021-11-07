
import "./styles.css"
import {users} from '../../data/data'

const UserHandle = (props) => {
    return (
        
        <div id="profile_user_handle">
            <div className="profile_picture_container">
                <img src="/images/user_icon.svg" alt="profile icon" className="profile_picture"/>
            </div>
            <h1 id="username">{users[props.user].name}</h1>
            <h3 id="user_email">{users[props.user].email}</h3>
        </div>
    )
}

export default UserHandle




