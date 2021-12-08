
import "./styles.css"
import { deleteUser, unreportUser} from "../../actions/user"
import {_profilePicturesWhite} from "../../data/constants";
import {useHistory} from "react-router-dom";

const ReportedUsers = ({users}) => {

    const history = useHistory()

    const goToProfile = (id) =>{
        history.push(`/user/${id}`)
    }
    const profilePictures = _profilePicturesWhite;
    return (
        <div className='reported-content profile-card-background profile-container'>
            <h1 className="section_title">Reported Users</h1>
            <div id="reported-users" className="user-list">
               {(users.length === 0) ? <div>There are no users that have been reported</div>:
               users.map(user =>  
                <div className="reported-user-handle-container">
                    <div className="reported-user-picture-container" title={(user.name)} onClick={() => goToProfile(user._id)}>
                        <img src={profilePictures[user.profileImageIndex]} alt={(user.name)} className="reported-user-picture-container__image"/>
                    </div>
                    <div className="reported-user-handle-infotmation-container">
                        <h1 className="reported-user-handle-infotmation-container__h1" title="Name">{user.name}</h1>
                        <h2 className="reported-user-handle-infotmation-container__h2" title="Username">{user.username}</h2>
                        <h3 className="reported-user-handle-infotmation-container__h3" title="Email">{user.email}</h3>
                    </div>
                    <div className="reported-user-handle-button-container">
                        <button className="reported-user-handle-container__button" title="un-report user" onClick={() => unreportUser(user._id)}>Un-Report</button>
                        <button className="reported-user-handle-container__button group-button-container__button--red" title="delete user" onClick={() => deleteUser(user._id)}>Delete User</button>
                    </div>

                </div>
                )}
            </div>
        </div>
    )
}

export default ReportedUsers