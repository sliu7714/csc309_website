
import "./styles.css"
import { useState, useEffect } from "react"
import {getReportedUsers, unreportUser} from "../../actions/user"
import {_profilePictures} from "../../data/constants";

const ReportedUsers = ({users}) => {
    const profilePictures = _profilePictures;
    return (
        <div className='reported-content profile-card-background profile-container'>
            <h1 className="section_title">Reported Users</h1>
            <div id="reported-users" className="user-list">
               {(users.length === 0) ? <div>There are no users that have been reported</div>:
               users.map(user =>  
                                <div className="reported-user-handle-container">
                                    <div className="reported-user-picture-container" title={(user.name)}>
                                        <img src={profilePictures[user.profileImageIndex]} alt={(user.name)} className="reported-user-picture-container__image"/>                         
                                    </div>
                                    <div className="reported-user-handle-infotmation-container">
                                        <h1 className="reported-user-handle-infotmation-container__h1" title="Name">{user.name}</h1>
                                        <h2 className="reported-user-handle-infotmation-container__h2" title="Username">{user.username}</h2>
                                        <h3 className="reported-user-handle-infotmation-container__h3" title="Email">{user.email}</h3>
                                    </div>
                                    <div className="reported-user-handle-button-container">
                                        <button className="reported-user-handle-container__button" title="Edit Profile Information" onClick={() => unreportUser(user._id)}>Un-Report</button>
                                    </div>

                                </div>
                )}
            </div>
        </div>
    )
}

export default ReportedUsers